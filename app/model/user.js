'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    hashedPassword: {
        type: String,
        required: true
    },

    // 0 普通用户
    // 10 管理员
    role : {
        type : Number,
        default : 0
    },

    createAt : {
        type : Date,
        default : Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;