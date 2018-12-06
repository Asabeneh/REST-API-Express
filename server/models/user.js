const mongoose = require('mongoose');

const User = mongoose.model('User', {
    firstname:{
        type:String,
        required:true,
        minlength:3,
        trim:true

    },
    lastname:{
        type:String,
        required:true,
        minlength:3,
        trim:true

    },
    email:{
        type:String,
        required:true,
        minlength:3,
        trim:true
    },
    photo:{

    },
    content:{
        type:String,
        minlength:10
    }
});



module.exports = {
    User
}