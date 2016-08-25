'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Promise = require('bluebird');

const genSalt = Promise.promisify(bcrypt.genSalt);
const hash = Promise.promisify(bcrypt.hash);
const compare = Promise.promisify(bcrypt.compare);


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

    createAt : {
        type : Date,
        default : Date.now
    }
});


UserSchema.methods = {

    authenticate : (password) => {
        this.encryptPasswor(password)
            .then((hashPass) => {
                return this.hashedPassword === hashPass;
            })
            .catch((err) => {
                console.log(err);
            })
    },

    makeSalt : () => {
        return genSalt(10);
    },    

    encryptPassword : (password) => {
        return hash(password, this.salt);
    }
}


const User = mongoose.model('User', UserSchema);

module.exports = User;