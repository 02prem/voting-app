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

router.get('/showUsers', async (req, res, next) => {
    try{
        const users = await db.User.find();

        res.status(200).json(users);
    }
    catch(err){
        err.status = 400;
        next(err);
    }
})

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

router.route('/:id').get(
    auth, async (req, res, next) => {
        try{
            const {id} = req.params;    // http ://bfufg/api/admin/<params>

            const poll = await db.Poll.findById(id).populate('admin', ['username', 'id']);

            if(!poll){
                throw new Error('No poll found');
            }

            res.status(200).json(poll);
        }
        catch(err){
            err.status = 400;
            next(err);
        }
    }
).delete(auth, async (req, res, next) => {
    try{
        // we will use this type of variable naming because both have same name for 'id'
        const {id: pollid} = req.params;
        const {id: userid} = req.decoded;

        const poll = await db.Poll.findById(pollid);
        if(!poll){
            throw new Error('No poll found');
        }
        if(poll.admin.toString() !== userid){
            throw new Error('Unauthorized access');
        }

        await db.Poll.deleteOne({ _id: pollid }).then((result) => {
            console.log('Poll Deleted successfully');
            res.status(202).json(poll);     // 202 -> Accepted
        }).catch((err) => {
            throw new Error('Error deleting the poll');
        })

        // res.status(202).json(poll);
    }
    catch(err){
        err.status = 400;
        next(err);
    }
});

module.exports = router;