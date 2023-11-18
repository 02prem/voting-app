const router = require('express').Router();
const db = require('../models');

router.route('/').get(
    // return all the polls in the db
    async (req, res,next) => {
        try{
            const polls = await db.Poll.find();

            res.status(200).json(polls);
        }
        catch(err){
            err.status = 400;
            next(err);
        }
});

// router.route('/').post(
//     // create polls in db
//     async (req, res, next) => {
//         try{
//             const {question, options} = req.body;   // options will be array of option
//             const poll = await db.Poll.create({
//                 question,
//                 // .map calls a defined callback function on each element of an array, and returns an array that contains the results.
//                 options: options.map(option => ({option, votes: 0}))
//             });

//             res.status(201).json(poll); // 201 status -> Created
//         }
//         catch(err){
//             err.status = 400;
//             next(err);
//         }
//     }
// );

// router.get('/user', auth, async (req, res, next) => {
//     try{

//     }
//     catch(err){
//         err.status = 400;
//         next(err);
//     }
// })

// router.route('/:id').get();

module.exports = router;