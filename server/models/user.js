const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    // role: {
    //     type: String,
    //     required: true
    // }
});

userSchema.methods.comparePassword = async function(attempted, next){
    try{
        return (attempted == this.password);
    }
    catch(err){
        next(err);
    }
}

module.exports = mongoose.model('User', userSchema);
