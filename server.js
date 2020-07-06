//server.js
const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
// ../models/users.model not js(possible fix)

// Mongoose addtition
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
//const mongoClient = require('mongodb').MongoClient;
//----------------------------------------------------------------------------------------------------------
// Schemas (making them external after)
const ScoresSchema = new Schema({ 
  HighScore: {type: Number , default: 0},
  TotalCorrect: {type: Number , default: 0},
  TotalAttempted: {type: Number , default: 0}
});

const UserScores = new Schema({ 
	Intro: [ScoresSchema],
	CS1: [ScoresSchema],
  CS2: [ScoresSchema],
  Total:  [ScoresSchema]
});

const UsersSchema = new Schema({ 
	FirstName: { type: String },
	LastName: { type: String }, 
	Email: { type: String },
	Password: { type: String },
	Scores: [UserScores]
});

// const highScoreSchema = new Schema (
// {
//   FirstName: { type: String },
//   LastName: { type: String }, 
//   Score: {type: Number}
// });
//----------------------------------------------------------------------------------------------------------

const router = require('./routes/index');
const { response, request } = require('express');
const { schema } = require('./models/users');

const app = express(); 
const PORT = 3001; 
const MONGODB_URI = "mongodb+srv://Wildsoul:Katara@cluster0-xs7yp.mongodb.net/CS2EZ?retryWrites=true&w=majority"; 

// app.use(cors())
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/api', router); 

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}); 
var db = mongoose.connection;

mongoose.connection.once('open', function() { 
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
}); 
//----------------------------------------------------------------------------------------------------------
// Initializing Models
const userModel = mongoose.model("user", UsersSchema);

//----------------------------------------------------------------------------------------------------------
var id = '';
var firstName = '';
var lastName = '';
var error = '';
//----------------------------------------------------------------------------------------------------------

app.post('/api/login', async (req, res, next) => 
{
  console.log('We are currently in the login API');
  console.log(req.body);
  //response.send(req.body);
  const { email, password } = req.body;
  console.log('Data Recieved Email: ' + email + ' Password: ' + password)
// Find the Users other fields
  const credentials = await userModel.find({Email: email, Password:password}, function(err)
    {
      if (err)
      {
        console.log(err);
        error = err;
      }
    });
  // No errors on using the find function
  console.log(credentials);
  
  if (credentials.length > 0)
  {
    id = credentials[0]._id;
    console.log('ID: ' + id);
  
    firstName = credentials[0].FirstName;
    console.log('First Name: ' + firstName);
  
    lastName = credentials[0].LastName;
    console.log('Last Name: ' + lastName);

    introScore = credentials[0].Scores[0].Intro[0];
    console.log('Intro Array: ' + introScore);

    CS1Score = credentials[0].Scores[0].CS1[0];
    console.log('CS1 Array: ' + CS1Score);

    CS2Score = credentials[0].Scores[0].CS2[0];
    console.log('CS1 Array:  ' + CS2Score);

    totalScore = credentials[0].Scores[0].Total[0];
    console.log('Total Array:  ' + totalScore);

    error = 'Sucess';
  }
  else
  {
    console.log('No records found');
    error = 'No Records found';
  }

  // Creating JSON Package to Send back 
  var ret =
  {
    ID : id, 
    firstName : firstName,
    lastName : lastName,
    intro: introScore,
    CS1: CS1Score,
    CS2: CS2Score,
    Total: totalScore,
    error : error 
  }

  // Everything is Good, we are sending back a JSON Package
  res.status(200).json(ret);
  });

//----------------------------------------------------------------------------------------------------------
app.post('/api/register', async (req, res, next) => 
{
  console.log('We are currently in the register API');
  console.log(req.body);
  //response.send(req.body);
  const { firstName, lastName, email, password } = req.body;
  console.log('Data Recieved \nEmail: ' + email + ' Password: ' + password + ' FirstName: ' + firstName + ' LastName: ' + lastName);
  // Check if User already Exist
  const credentials = await userModel.find({Email: email, Password:password}, function(err)
  {
    if (err)
    {
      console.log(err);
      error = err;
    }
  });

  if (credentials.length == 0)
  {
    console.log('No records Found');
    var userInstance = new userModel
    ({
      FirstName: firstName, 
      LastName: lastName,
      Email: email,
      Password: password,
      Scores: [
      {
        Intro: 
        [{
          HighScore: 0,
          TotalCorrect: 0,
          TotalAttempted: 0
        }], 
        CS1 : [
        {
          HighScore: 0,
          TotalCorrect: 0,
          TotalAttempted: 0
        }], 
        CS2 : [
        {
          HighScore: 0,
          TotalCorrect: 0,
          TotalAttempted: 0
        }],
        Total : [
          {
            HighScore: 0,
            TotalCorrect: 0,
            TotalAttempted: 0
          }]
      }]
    });
    userInstance.save().then(result => 
    {
      console.log(result);
      error = 'Sucess';
      var ret =
      {
        firstName : firstName,
        lastName : lastName,
        error : error 
      }
    })
    .catch(err => 
    {
      error = err;
      console.log('Save() Exception: ', err);
    });
  }
  else
  {
    console.log('User Already Exist')
    error = 'User Name Already Exist';
    var ret =
    {
      firstName : firstName,
      lastName : lastName,
      error : error 
    }
  }
   // Everything is Good, we are sending back a JSON Package
   res.status(200).json(ret);
});
//----------------------------------------------------------------------------------------------------------
app.post('/api/updateIntro', async (req, res, next) => 
{
  console.log('We are currently in the Scores API');
  console.log(req.body);
  const { _id, firstName, lastName, introScore} = req.body;
  console.log('Data Recieved \n');
  const credentials = await userModel.find({_id: _id}, function(err)
  {
    if (err)
    {
      console.log(err);
      error = err;
    }
  });
  // Getting Previous Values
  var introHighScore = credentials[0].Scores[0].Intro[0].HighScore;
  var introTotalCorrect = credentials[0].Scores[0].Intro[0].TotalCorrect;
  var introTotalAttempted = credentials[0].Scores[0].Intro[0].TotalAttempted;
  var introScoresID = credentials[0].Scores[0].Intro[0]._id;
  console.log("IntroHighscore: " + introHighScore + " IntroTotal Correct: " + introTotalCorrect + " IntroTotalAttemtped: " + introTotalAttempted + " IntroScoresID: " + introScoresID)
  // Updating Previous Values
  if (parseInt(introScore) > introHighScore)
  {
    introHighScore = parseInt(introScore);
  }
  introTotalCorrect = parseInt(introTotalCorrect + parseInt(introScore));
  introTotalAttempted += 20;
  // Finished Updating Values
  await userModel.findOneAndUpdate
  (
    {"Scores.Intro._id" : introScoresID},
    {"$set" : {"Scores.0.Intro.$.HighScore" : introHighScore , "Scores.0.Intro.$.TotalCorrect" : introTotalCorrect , "Scores.0.Intro.$.TotalAttempted" : introTotalAttempted }},
    function(err, result)
    {
      if (err)
      {
        console.log(err);
        error = "Failure";
      }
      else
      {
        error = "Sucess";
      }
    }
  );
  var ret =
  {
    error : error 
  }
  res.status(200).json(ret);
});
//----------------------------------------------------------------------------------------------------------
app.post('/api/updateCS1', async (req, res, next) => 
{
  console.log('We are currently in the Scores API');
  console.log(req.body);
  const { _id, firstName, lastName, CS1Score} = req.body;
  console.log('Data Recieved \n');
  const credentials = await userModel.find({_id: _id}, function(err)
  {
    if (err)
    {
      console.log(err);
      error = err;
    }
  });
  // Getting Previous Values
  var CS1HighScore = credentials[0].Scores[0].CS1[0].HighScore;
  var CS1TotalCorrect = credentials[0].Scores[0].CS1[0].TotalCorrect;
  var CS1TotalAttempted = credentials[0].Scores[0].CS1[0].TotalAttempted;
  var CS1ScoresID = credentials[0].Scores[0].CS1[0]._id;
  console.log("CS1Highscore: " + CS1HighScore + " CS1Total Correct: " + CS1TotalCorrect + " CS1TotalAttemtped: " + CS1TotalAttempted + " CS1ScoresID: " + CS1ScoresID)
  // Updating Previous Values
  if (parseInt(CS1Score) > CS1HighScore)
  {
    CS1HighScore = parseInt(CS1Score);
  }
  CS1TotalCorrect = parseInt(CS1TotalCorrect + parseInt(CS1Score));
  CS1TotalAttempted += 20;
  // Finished Updating Values
  await userModel.findOneAndUpdate
  (
    {"Scores.CS1._id" : CS1ScoresID},
    {"$set" : {"Scores.0.CS1.$.HighScore" : CS1HighScore , "Scores.0.CS1.$.TotalCorrect" : CS1TotalCorrect , "Scores.0.CS1.$.TotalAttempted" : CS1TotalAttempted }},
    function(err, result)
    {
      if (err)
      {
        console.log(err);
        error = "Failure";
      }
      else
      {
        error = "Success";
      }
    }
  );
  var ret =
  {
    error : error 
  }
  res.status(200).json(ret);
});
//----------------------------------------------------------------------------------------------------------
app.post('/api/updateCS2', async (req, res, next) => 
{
  console.log('We are currently in the Scores API');
  console.log(req.body);
  const { _id, firstName, lastName, CS2Score} = req.body;
  console.log('Data Recieved \n');
  const credentials = await userModel.find({_id: _id}, function(err)
  {
    if (err)
    {
      console.log(err);
      error = err;
    }
  });
  // Getting Previous Values
  var CS2HighScore = credentials[0].Scores[0].CS2[0].HighScore;
  var CS2TotalCorrect = credentials[0].Scores[0].CS2[0].TotalCorrect;
  var CS2TotalAttempted = credentials[0].Scores[0].CS2[0].TotalAttempted;
  var CS2ScoresID = credentials[0].Scores[0].CS2[0]._id;
  console.log("CS2Highscore: " + CS2HighScore + " CS2Total Correct: " + CS2TotalCorrect + " CS2TotalAttemtped: " + CS2TotalAttempted + " CS2ScoresID: " + CS2ScoresID)
  // Updating Previous Values
  if (parseInt(CS2Score) > CS2HighScore)
  {
    CS2HighScore = parseInt(CS2Score);
  }
  CS2TotalCorrect = parseInt(CS2TotalCorrect + parseInt(CS2Score));
  CS2TotalAttempted += 20;
  // Finished Updating Values
  await userModel.findOneAndUpdate
  (
    {"Scores.CS2._id" : CS2ScoresID},
    {"$set" : {"Scores.0.CS2.$.HighScore" : CS2HighScore , "Scores.0.CS2.$.TotalCorrect" : CS2TotalCorrect , "Scores.0.CS2.$.TotalAttempted" : CS2TotalAttempted }},
    function(err, result)
    {
      if (err)
      {
        console.log(err);
        error = "Failure";
      }
      else
      {
        error = "Success";
      }
    }
  );
  var ret =
  {
    error : error 
  }
  res.status(200).json(ret);
});
//----------------------------------------------------------------------------------------------------------
app.post('/api/updateCS2', async (req, res, next) => 
{
  console.log('We are currently in the Scores API');
  console.log(req.body);
  const { _id, firstName, lastName, CS2Score} = req.body;
  console.log('Data Recieved \n');
  


  var ret =
  {
    error : "Testing" 
  }
  res.status(200).json(ret);
});
// Add API end points here that call external functions 
app.get('/', function(request, response) { response.send('Hello World!') });

app.listen(PORT, function() { 
  console.log(`Server listening on port ${PORT}.`);
});
