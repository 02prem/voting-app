const router = require('express').Router();
const db = require('../models');
const auth = require('../middlewares/auth');

router.route('/').get(
    // return all the polls in the db
    async (req, res,next) => {
        try{
            const polls = await db.Poll.find().populate('admin', ['username', 'id']);

            res.status(200).json(polls);
        }
        catch(err){
            err.status = 400;
            next(err);
        }
});

router.post('/:id', auth, async (req, res, next) => {
    try{
        const {id: pollid} = req.params;
        const {id: userid} = req.decoded;

        const {answer} = req.body;

        if(answer){
            const poll = await db.Poll.findById(pollid);

            if(!poll){
                throw new Error('No poll found');
            }

            // find the option and return the option with updated vote number
            const vote = poll.options.map(
                option => {
                    if(option.option === answer){
                        return {
                            option: option.option,
                            _id: option._id,
                            votes: option.votes + 1
                        };
                    }
                    else{
                        return option;
                    }
                }
            );

            // check if user has already voted
            // if user has not voted then update the option with updated vote
            const matchingUsers = poll.voted.filter(user => user.toString() === userid);    // array

            if(matchingUsers.length <= 0){  // user has not voted the poll
                poll.voted.push(userid);
                poll.options = vote;    // updated the option
                await poll.save();

                res.status(202).json(poll);
            }
            else{
                throw new Error('Already voted');
            }
        }
        else{
            throw new Error('No answer provided');
        }
    }
    catch(err){
        err.status = 400;
        next(err);
    }
})

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