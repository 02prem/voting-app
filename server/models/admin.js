const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Admin } = require('.');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    polls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    }]
});

adminSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this.password, 10);
        this.password = hashed;
        return next();
    } 
    catch (err) {
        return next(err);
    }
  });

adminSchema.methods.comparePassword = async function(attempted, next){
    try{
        return await bcrypt.compare(attempted, this.password);
    }
    catch(err){
        return next(err);
    }
}

module.exports = mongoose.model('Admin', adminSchema);
