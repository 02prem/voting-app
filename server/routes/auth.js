const router = require('express').Router(); // import express and create instance of Router
// const handle = require('../handlers');
const db = require('../models');

// router.get('/', async (req, res, next) => {
//     try {
//         const users = await db.User.find();
  
//         return res.status(200).json(users);
//     } 
//     catch (err) {
//         return next({
//             status: 400,
//             message: err.message,
//         });
//     }
// });

router.post('/register', async function(req, res, next) {
    try{
        const user = await db.User.create(req.body);
        const {id, username} = user;
        res.json({id, username});
    }
    catch(err){
        next(err);
    }
});  // route for POST request to './register'

router.post('/login', async function(req, res, next) {
    try{
        const user = await db.User.findOne({ username: req.body.username, });
        const {id, username} = user;

        const valid = await user.comparePassword(req.body.password);
        if(valid){
            res.json({id, username});
        }
        else{
            throw new Error('Invalid Username/password');
        }
    }
    catch(err){
        next(err);
    }
});

module.exports = router;