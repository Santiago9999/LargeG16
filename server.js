//server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const util = require('./utilities/util')
//const Schema = mongoose.Schema;
//----------------------------------------------------------------------------------------------------------
// Schemas
const userModel = require('./models/users'); 
const leaderboardModelIntro = require('./models/leaderboardIntro'); 
const leaderboardModelCS1 = require('./models/leaderboardCS1'); 
const leaderboardModelCS2 = require('./models/leaderboardCS2'); 
const leaderboardModelTotal = require('./models/leaderboardTotal'); 
//----------------------------------------------------------------------------------------------------------

const router = require('./routes/index');
const {
  response,
  request
} = require('express');
const {
  schema
} = require('./models/users');

const app = express();
const PORT = 3002;
const MONGODB_URI = "mongodb+srv://Wildsoul:Katara@cluster0-xs7yp.mongodb.net/CS2EZ?retryWrites=true&w=majority";

// app.use(cors())
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use('/api', router);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
var db = mongoose.connection;

mongoose.connection.once('open', function () {
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function (error) {
  console.log('Mongoose Connection Error : ' + error);
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Get rid of all of this
const numberOfQuestionsPerSession = 20;
var id = '';
var firstName = '';
var lastName = '';
var phase1 = '';
var phase2 = '';
var phase3 = '';
var error = '';
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/api/login', async (req, res, next) => {
  console.log('We are currently in the login API');
  console.log(req.body);
  //response.send(req.body);
  const {
    email,
    password
  } = req.body;
  console.log('Data Recieved Email: ' + email + ' Password: ' + password)
  // Find the Users other fields
  const credentials = await userModel.find({
    Email: email,
    Password: password
  }, function (err) {
    if (err) {
      console.log(err);
      error = err;
    }
  });
  // No errors on using the find function
  console.log(credentials);
  if (credentials.length > 0) {
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
  } else {
    console.log('No records found');
    error = 'No Records found';
  }

  // Creating JSON Package to Send back 
  var ret = {
    ID: id,
    firstName: firstName,
    lastName: lastName,
    intro: introScore,
    CS1: CS1Score,
    CS2: CS2Score,
    Total: totalScore,
    error: error
  }

  // Everything is Good, we are sending back a JSON Package
  res.status(200).json(ret);
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/api/register', async (req, res, next) => {
  console.log('We are currently in the register API');
  console.log(req.body);
  //response.send(req.body);
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;
  console.log('Data Recieved \nEmail: ' + email + ' Password: ' + password + ' FirstName: ' + firstName + ' LastName: ' + lastName);
  // Check if User already Exist
  const credentials = await userModel.find({
    Email: email,
    Password: password
  }, function (err) {
    if (err) {
      console.log(err);
      error = err;
    }
  });

  if (credentials.length == 0) {
    console.log('No records Found');
    var userInstance = new userModel({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
      Scores: [{
        Intro: [{
          HighScore: 0,
          TotalCorrect: 0,
          TotalAttempted: 0
        }],
        CS1: [{
          HighScore: 0,
          TotalCorrect: 0,
          TotalAttempted: 0
        }],
        CS2: [{
          HighScore: 0,
          TotalCorrect: 0,
          TotalAttempted: 0
        }],
        Total: [{
          HighScore: 0,
          TotalCorrect: 0,
          TotalAttempted: 0
        }]
      }]
    });
    userInstance.save().then(result => {
        console.log(result);
        error = 'Sucess';
        var ret = {
          firstName: firstName,
          lastName: lastName,
          error: error
        }
      })
      .catch(err => {
        error = err;
        console.log('Save() Exception: ', err);
      });
  } else {
    console.log('User Already Exist')
    error = 'User Name Already Exist';
  }
  var ret = {
    firstName: firstName,
    lastName: lastName,
    error: error
  }
  // Everything is Good, we are sending back a JSON Package
  res.status(200).json(ret);
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/api/updateIntro', async (req, res, next) => {
  console.log('We are currently in the UpdateIntro API');
  console.log(req.body);
  const {
    _id,
    firstName,
    lastName,
    score
  } = req.body;
  const credentials = await userModel.find({
    _id: _id
  }, function (err) {
    if (err) {
      console.log(err);
      error = err;
    }
  });
  // Getting Previous Values
  var val = util.getScores(credentials,'Intro',score);
  await util.updateUser(val[0],'Intro', parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updating Total Table
  const postUpdateCredentials = await userModel.find({
    _id: _id
  });
  var val2 = util.getTotalScores(postUpdateCredentials);
  await util.updateTotal(val2[0], parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updating LeaderBoard Table
  // Checking To see if record Exist
  await util.updateLeaderboard(leaderboardModelIntro, postUpdateCredentials, _id, 'Intro', firstName, lastName, parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
  await util.updateLeaderboard(leaderboardModelTotal, postUpdateCredentials, _id, 'Total',firstName, lastName, parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
  var ret = {
    Phase1: phase1,
    Phase2: phase2,
    Phase3: phase3,
    Error: error
  }
  res.status(200).json(ret);
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/api/updateCS1', async (req, res, next) => {
  console.log('We are currently in the UpdateCS1 API');
  console.log(req.body);
  const {
    _id,
    firstName,
    lastName,
    score
  } = req.body;
  const credentials = await userModel.find({
    _id: _id
  }, function (err) {
    if (err) {
      console.log(err);
      error = err;
    }
  });
  // Getting Previous Values
  var val = util.getScores(credentials, 'CS1',score);
  await util.updateUser(val[0],"CS1", parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updating Total Table
  const postUpdateCredentials = await userModel.find({
    _id: _id
  });
  var val2 = util.getTotalScores(postUpdateCredentials);
  await util.updateTotal(val2[0], parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updating LeaderBoard Table
  // Checking To see if record Exist
  await util.updateLeaderboard(leaderboardModelCS1, postUpdateCredentials, _id, 'CS1', firstName, lastName, parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
  await util.updateLeaderboard(leaderboardModelTotal, postUpdateCredentials, _id, 'Total',firstName, lastName, parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
  var ret = {
    Phase1: phase1,
    Phase2: phase2,
    Phase3: phase3,
    Error: error
  }
  res.status(200).json(ret);
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.post('/api/updateCS2', async (req, res, next) => {
  console.log('We are currently in the UpdateCS2 API');
  console.log(req.body);
  const {
    _id,
    firstName,
    lastName,
    score
  } = req.body;
  const credentials = await userModel.find({
    _id: _id
  }, function (err) {
    if (err) {
      console.log(err);
      error = err;
    }
  });
  // Getting Previous Values
  var val = util.getScores(credentials, 'CS2',score);
  await util.updateUser(val[0],'CS2', parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updating Total Table
  const postUpdateCredentials = await userModel.find({
    _id: _id
  });
  var val2 = util.getTotalScores(postUpdateCredentials);
  await util.updateTotal(val2[0], parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updating LeaderBoard Table
  // Checking To see if record Exist
  await util.updateLeaderboard(leaderboardModelCS2, postUpdateCredentials, _id, 'CS2', firstName, lastName, parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
  await util.updateLeaderboard(leaderboardModelTotal, postUpdateCredentials, _id, 'Total',firstName, lastName, parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
  var ret = {
    Phase1: phase1,
    Phase2: phase2,
    Phase3: phase3,
    Error: error
  }
  res.status(200).json(ret);
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get('/api/getIntroHighScores', async (req, res, next) => {
  console.log('We are currently in the Get Intro HighScores API');
  console.log(req.body);
  const {
    numberOfSpots
  } = req.body;
  var leaderBoard = await leaderboardModelIntro.find().sort({
    'HighScore': -1
  }).limit(numberOfSpots).then(reviews => {
    res.status(200).json(reviews)
  });
});
app.get('/api/getCS1HighScores', async (req, res, next) => {
  console.log('We are currently in the Get CS1 HighScores API');
  console.log(req.body);
  const {
    numberOfSpots
  } = req.body;
  var leaderBoard = await leaderboardModelCS1.find().sort({
    'HighScore': -1
  }).limit(numberOfSpots).then(reviews => {
    res.status(200).json(reviews)
  });
});
app.get('/api/getCS2HighScores', async (req, res, next) => {
  console.log('We are currently in the Get CS2 HighScores API');
  console.log(req.body);
  const {
    numberOfSpots
  } = req.body;
  var leaderBoard = await leaderboardModelCS2.find().sort({
    'HighScore': -1
  }).limit(numberOfSpots).then(reviews => {
    res.status(200).json(reviews)
  });
});
app.get('/api/getTotalHighScores', async (req, res, next) => {
  console.log('We are currently in the Get Total HighScores API');
  console.log(req.body);
  const {
    numberOfSpots
  } = req.body;
  var leaderBoard = await leaderboardModelTotal.find().sort({
    'HighScore': -1
  }).limit(numberOfSpots).then(reviews => {
    res.status(200).json(reviews)
  });
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Add API end points here that call external functions 
app.get('/', function (request, response) {
  response.send('Hello World!')
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`);
});
