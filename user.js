import mongoose from 'mongoose';
//const mongoose = require('mongoose');
//const validator = require('validator');
import validator from 'validator';

const Schema = mongoose.Schema;

let User = new Schema({
    name: {
        type: String,
        required: [true, 'please choose a username']
    },
    platform: {
        type: String 
    },
    
    photo: String,
    
    password: {
        type: String,
        required: [true, 'please enter a password']
    },
  
});

export default mongoose.model('User', User);