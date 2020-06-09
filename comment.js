import mongoose from 'mongoose';
//const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Comment = new Schema({
    
    reporter: {
        type: String 
    },
    description: {
        type: String
    },
    
});

export default mongoose.model('Comment', Comment);