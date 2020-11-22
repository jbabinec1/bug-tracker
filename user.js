import mongoose from 'mongoose';
//const mongoose = require('mongoose');
//const validator = require('validator');
import validator from 'validator';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

let permissions = ["user", "admin"];
let user = "user";

let User = new Schema({
    name: {
        type: String,
        required: [true, 'please choose a username']
    },
    platform: {
        type: String 
    },

    //photo: String,
    role: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    
    password: {
        type: String,
        required: [true, 'please enter a password'],
        select: false
    },
  
});


//Before sending to database, encrpyt password 
User.pre('save', async function (next){

    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
});


User.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}



export default mongoose.model('User', User);