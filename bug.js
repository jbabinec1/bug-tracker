import mongoose from 'mongoose';
//const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Bug = new Schema({
    title: {
        type: String
    },
    reporter: {
        type: String 
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    status: {
        type: String,
        default: 'Open'
    },
    comments: [{
       comment: { type: String },
       commenter: { type: String }
    }]
});

export default mongoose.model('Bug', Bug);