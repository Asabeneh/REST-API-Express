const http = require("http");
const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const { parse } = require('querystring');
const formidable = require('formidable')
const {studentsInfo} = require("./studentsInfo");



const app = express();

console.log(path.join(__dirname, 'public'));


app.set('view engine','ejs');

app.use(express.static(__dirname + '/assets')); 
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



let individualUser;


app.get('/',(req,res) => {
    res.render('students',{studentsInfo})
})
app.get('/students',(req, res) => {
    res.json(studentsInfo)
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

app.get('/add-student',(req,res) =>{
    console.log(req.body)
    res.render('addStudent')
})
app.post('/students',(req, res) => {
    let id = studentsInfo.length + 1;
    id++;
 
            
    const {firstName,lastName,title,nationality, whySoftwareDeveloper, favoriteQuote, src:photo, skilss} = req.body;
    console.log(req.body)
    
    // fs.createWriteStream(__dirname + '/assets/images/' + `${photo}`);

    studentsInfo.push(req.body); 

    res.redirect('/')
 
 
});

app.delete('/students/:id',(req,res) => {
    const id = Number(req.params.id);
    let flag = true;
    let deletedUser = {}; 
    for(let i = 0; i < studentsInfo.length; i++){
        if(studentsInfo[i]._id === id){
            studentsInfo.splice(i,1);
            Object.assign(deletedUser,users[i]);
            flag = true;
            res.json(studentsInfo);
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


