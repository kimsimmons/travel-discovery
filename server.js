var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var port = 3000;


// mongoose.connect("mongodb://localhost/traveldisc");
var mongoDB = 'mongodb://localhost/traveldisc';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

// set the view engine to ejs
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// database references
var User = require("./models/users");
var Question = require("./models/questions");
var Answer = require("./models/answers");

// load the index page
app.get('/', function(req, res){
  res.render('pages/index');
});

// load view - questions for a form to add questions
app.get('/admin/questions', function(req, res){
  res.render('pages/admin/questions');
});

// save the data from the form
app.post('/saveQuestion', function(req, res){
  var newQuest = new Question({
      title: req.body.quest_title,
      image: req.body.img_file
  });

  // save the new question then render the all page, catch any errors and respond with error
  newQuest.save().then(data => {
      console.log(data);
      res.render('pages/admin/all');
  }).catch(err => {
      res.status(400).send('Unable to save the question to the database');
    }
  );
});

app.listen(port, function(){
  console.log("listening on port: " + port);
})
