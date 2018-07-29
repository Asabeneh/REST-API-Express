const http = require("http");
const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const path = require('path');
const { parse } = require('querystring');
const formidable = require('formidable')
const {studentsInfo} = require("./studentsInfo");
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODU_URI || 'mongodb://localhost:27017/StudentsInfo');

const app = express();

console.log(path.join(__dirname, 'public'));

app.set('view engine','ejs');
app.use(express.static(__dirname + '/assets')); 

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(fileUpload());

let individualUser;


app.get('/',(req,res) => {
    res.render('students',{studentsInfo})
})
app.get('/students/api',(req, res) => {
    res.json(studentsInfo)
});

app.get('/students/api/:id', (req, res) => {
    const id = req.params.id;
    let flag = false;
    for (let i = 0; i < studentsInfo.length; i++) {
        if (studentsInfo[i]._id == id) {
            individualUser = studentsInfo[i];
            console.log(studentsInfo[i].nationality)
            flag = true;
            res.json(studentsInfo[i]);
            break;
        }
    }
    if (!flag) {
        console.log('User was not found.')
        res.render("notFound")
    }

});

app.get('/students/:id', (req, res) => {
    const id = req.params.id;
    let flag = false;
    for (let i = 0; i < studentsInfo.length; i++) {
        if (studentsInfo[i]._id == id) {
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
 
    // console.log('what is this file', req.files.src);
    console.log('what is it', req.files);
    console.log(req.body);
    let skillList = req.body.skills.trim().split(', ');
    // console.log(skillList)
  
     if (!req.files) return res
         .status(400)
         .send("No files were uploaded.");
        let sampleFile = req.files.src;

     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
     // Use the mv() method to place the file somewhere on your server
     sampleFile.mv(
       __dirname + "/assets/images/" + sampleFile.name,
       function(err) {
         if (err) return res.status(500).send(err);
          req.body._id = id;
          req.body.src = sampleFile.name;
          req.body.alt = sampleFile.name.slice(0, sampleFile.name.length-4);
          req.body.skills = skillList;

             studentsInfo.push(req.body);
             res.redirect("/");
       }
     );

    
    // const {_id:id, firstName,lastName,title,nationality, whySoftwareDeveloper, favoriteQuote, src, skilss} = req.body;
    // console.log(req.body)
    
    // fs.createWriteStream(__dirname + '/assets/images/' + `${photo}`);

});

app.delete('/students/:id',(req,res) => {
    const id = Number(req.params.id);
    let flag = true;
    for(let i = 0; i < studentsInfo.length; i++){
        if(studentsInfo[i]._id === id){
            studentsInfo.splice(i,1);
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
        res.render('Student deleted',{student:studentsInfo})
        res.send('A user with Id is deleted')
    }
});

app.put("/students/edit", (req, res) => {
  const id = req.params.id;
  let flag = true;
  for (let i = 0; i < studentsInfo.length; i++) {
    if (studentsInfo[i]._id == id) {
      studentsInfo.splice(i, 1);
      flag = true;
      res.json(studentsInfo);
      break;
    }
  }
  if (!flag) {
    console.log("User was not found with this ID.");
    res.render("notFound");
  } else {
    console.log("A user with Id is deleted");
    console.log("Deleted:", deletedUser);
    res.render("Student deleted", { student: studentsInfo });
    res.send("A user with Id is deleted");
  }
});


console.log(individualUser)
app.listen(port,  () => {
    console.log(`Server is running on port ${port}....`)
});


