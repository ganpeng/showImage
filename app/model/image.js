'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const imageSchema = new Schema({
    creator : {
        type : ObjectId,
        ref : 'User'
    },
    
    title : {
        type : String,
        required : true,
        trim : true
    },

    desc : {
        type : String,
        required : true,
        trim : true
    },

    url : {
        type : String,
        required : true,
        trim : true
    },

    createAt : {
        type : Date,
        default : Date.now
    },

    updateAt : {
        type : Date,
        default : Date.now
    }
});


imageSchema.pre('save', function(next) {
    if (this.isNew) {
        this.createAt = this.updateAt = Date.now;
    } else {
        this.updateAt = Date.now;
    }
    next();
});


const Image = mongoose.model('Image', imageSchema);

module.exports = Image;