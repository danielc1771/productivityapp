const express = require ('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
//const passport = require('passport');
const mongoose = require('mongoose');
//const config = require('./config/database');
const Task = require("./models/task");
//const seedDB = require("./seeds");


//Connecting to Database
mongoose.connect("mongodb://localhost/productivity");
//On Connection
// mongoose.connection.on('connected', function(){
// 	console.log('Connected to Database: ' + config.database);
// });

//On Error
// mongoose.connection.on('error', function(err){
// 	console.log('Database error: ' + err);
// })

const app = express();

//const users = require('./routes/users');

//Port Number
//const port = process.env.PORT || 8080;
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware

app.use(bodyParser.json());

//Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

// require('./config/passport')(passport);

//app.use('/users', users);

//Index Route
app.get("/home", function(req, res){
    //Get all task from db
    Task.find({}, function(err, allTasks){
        if(err){
            console.log(err);
        } else {
            res.render("home", {tasks:allTasks});
        }
    });
});

app.post("/home", function(req, res){
    var name = req.body.name;
    var desc = req.body.description;
    var color = req.body.color;
    var time = req.body.time;
    var newTask = {name: name, description: desc, color:color, time:0};
    //create a new campground and save to DB
    Task.create(newTask, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/home");
        }
    })
});

app.get("/new", function(req, res) {
   res.render("new"); 
});

//Start Server
app.listen(port, function(){
	console.log("Server start on port: " + port);
});
	