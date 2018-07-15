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

// const newUser = new User({
//     // email:'asabeneh@gmail.com',
//     // password:'Asab2169598'
// });

// newUser.save().then((doc)=>{
// console.log(JSON.stringify(doc,undefined,4))
// },(e) => {
//     console.log(e);
    
// })

module.exports = {
    User
}