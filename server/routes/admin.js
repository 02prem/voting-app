const router = require('express').Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

router.post('/AdminAuth', async function(req, res, next) {
    try{
        const user = await db.Admin.findOne({ username: req.body.username, });
        const {id, username} = user;

        const valid = await user.comparePassword(req.body.password);
        if(valid){
            const token = jwt.sign({id, username}, process.env.SECRET);

            res.json(user);
        }
        else{
            throw new Error();
        }
    }
    catch(err){
        err.message = 'Invalid Username/password';
        next(err);
    }
});

router.post('/createPoll', auth, async (req, res, next) => {
    const {id} = req.decoded;
    const {question, options} = req.body;

    try{
        const admin = await db.Admin.findById(id);
        const poll = await db.Poll.create({
            admin,
            question,
            // .map calls a defined callback function on each element of an array, and returns an array that contains the results.
            options: options.map(option => ({option, votes: 0}))
        });

        admin.polls.push(poll._id);
        await admin.save();

        res.status(201).json(poll);
    }
    catch(err){
        err.status = 400;
        next(err);
    }
});

router.get('/getPolls', auth, 
    async (req, res, next) => {
        try{
            const {id} = req.decoded;

            const admin = await db.Admin.findById(id).populate('polls');
            
            res.status(200).json(admin.polls);
        }
        catch(err){
            err.status = 400;
            next(err);
        }
    }
);

module.exports = router;