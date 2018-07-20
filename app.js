const http = require("http");
const fs = require("fs");
const path = require('path');
const { parse } = require('querystring');
const {studentsInfo} = require("./studentsInfo");

console.log(studentsInfo)

const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.set('view engine','ejs');

app.use(express.static(__dirname + '/assets/css'));
app.use(express.static(__dirname + '/assets/images'));


const port = process.env.PORT || 3000;

app.use(bodyParser.json())

const users = [
    {
        _id:1,
        firstname:'Asabneh',
        lastname:'Yetayeh',
        email:'asabeneh@gmail.com',
        photo:'',
        content:'Go for dinner',
        read:false
    },
    {
        _id:2,
        firstname:'Getaneh',
        lastname:'Shitahun',
        email:'getaneh@gmail.com',
        photo:'',
        content:'Go for lunch',
        read:false
    },
    {
        _id:3,
        firstname:'Amare',
        lastname:'Babel',
        email:'amare@gmail.com',
        photo:'',
        content:'Go to school',
        read:false
    },
    {
        _id:4,
        firstname:'Desalegn',
        lastname:'Workie',
        email:'desalegn@gmail.com',
        photo:'',
        content:'Go to work.',
        read:false
    }
]

let individualUser;


app.get('/',(req,res) => {
    res.render('index', {users})
  });

app.get('/users',(req, res) => {
    res.json(users)
});
app.get('/students',(req,res) => {
    res.render('students',{studentsInfo})
})
app.get('/users/:id',(req,res) => {
    const id = Number(req.params.id);
    let flag = false;
    for(let i = 0; i < users.length; i++){
        if(users[i]._id === id){
            individualUser = users[i];
            flag = true;
           res.render("user",{user:users[i]});
           break;
        }
    }
    if(!flag){
        console.log('User was not found.')
        res.render("notFound")
    }
   
});
app.get('/students/:id', (req, res) => {
    const id = Number(req.params.id);
    let flag = false;
    for (let i = 0; i < studentsInfo.length; i++) {
        if (studentsInfo[i]._id === id) {
            individualUser = studentsInfo[i];
            console.log(studentsInfo[i].nationality)
            flag = true;
            res.render("student", studentsInfo[i]);
            break;
        }
    }
    if (!flag) {
        console.log('User was not found.')
        res.render("notFound")
    }

});

app.get('/user',(req,res) =>{
    console.log(req.body)
    res.render('addUser')
})
app.post('/users',(req,res) => {
    let id = users.length + 1;
    id++;
    const {firstname,lastname,photo, content, read} = req.body;
    
    // fs.createWriteStream(__dirname + '/assets/images/' + `${photo}`);

    users.push({_id:id, firstname,lastname, photo, content,read:false}); 

    res.send({
        _id:id,
        firstname,lastname,photo,content,read
    })
 
 
});

app.delete('/users/:id',(req,res) => {
    const id = Number(req.params.id);
    let flag = true;
    let deletedUser = {}; 
    for(let i = 0; i < users.length; i++){
        if(users[i]._id === id){
            users.splice(i,1);
            Object.assign(deletedUser,users[i]);
            flag = true;
        //   res.json(users);
           break;
        }
    }
    if(!flag){
        console.log('User was not found with this ID.')
        res.render("notFound")
    }
    else{
        console.log('A user with Id is deleted');
        console.log('Deleted:',deletedUser)
        res.render('userDeleted',{user:deletedUser})
        res.send('A user with Id is deleted')
    }
});


console.log(individualUser)
app.listen(port,  () => {
    console.log(`Server is running on port ${port}....`)
});


