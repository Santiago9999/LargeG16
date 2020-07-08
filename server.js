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
  HighScore: {
    type: Number,
    default: 0
  },
  TotalCorrect: {
    type: Number,
    default: 0
  },
  TotalAttempted: {
    type: Number,
    default: 0
  }
});

const UserScores = new Schema({
  Intro: [ScoresSchema],
  CS1: [ScoresSchema],
  CS2: [ScoresSchema],
  Total: [ScoresSchema]
});

const UsersSchema = new Schema({
  FirstName: {
    type: String
  },
  LastName: {
    type: String
  },
  Email: {
    type: String
  },
  Password: {
    type: String
  },
  Scores: [UserScores]
});

const leaderboardSchema = new Schema({
  UserID: {
    type: String
  },
  FirstName: {
    type: String
  },
  LastName: {
    type: String
  },
  HighScore: {
    type: Number
  },
  TotalCorrect: {
    type: Number
  },
  TotalAttempted: {
    type: Number
  }
});
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
//----------------------------------------------------------------------------------------------------------
// Initializing Models
const userModel = mongoose.model("user", UsersSchema);
const leaderboardModelIntro = mongoose.model("leaderboardIntro", leaderboardSchema);
const leaderboardModelCS1 = mongoose.model("leaderboardCS1", leaderboardSchema);
const leaderboardModelCS2 = mongoose.model("leaderboardCS2", leaderboardSchema);
const leaderboardModelTotal = mongoose.model("leaderboardTotal", leaderboardSchema);

//----------------------------------------------------------------------------------------------------------
const numberOfQuestionsPerSession = 20;
var id = '';
var firstName = '';
var lastName = '';
var phase1 = '';
var phase2 = '';
var phase3 = '';
var error = '';
class values  {
  constructor(id, high, totalC, totalA) {
    this.id = id;
    this.high = high;
    this.totalC = totalC;
    this.totalA = totalA;
  }
  getID()
  {
    return this.id;
  }
  getHigh()
  {
    return this.high;
  }
  getTotalC()
  {
    return this.totalC;
  }
  getTotalA()
  {
    return this.totalA;
  }
}
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
  var val = getScores(credentials, 'Intro',score);
  await updateUser(val[0],'Intro', parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updating Total Table
  const postUpdateCredentials = await userModel.find({
    _id: _id
  });
  var val2 = await getTotalScores(postUpdateCredentials);
  await updateTotal(val2[0], parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updating LeaderBoard Table
  // Checking To see if record Exist
  await updateLeaderboard(leaderboardModelIntro, postUpdateCredentials, _id, parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
  await updateLeaderboard(leaderboardModelTotal, postUpdateCredentials, _id, totalHighScore, totalTotalCorrect, totalTotalAttempted);
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
  var val = getScores(credentials, 'CS1',score);
  await updateUser(val[0],"CS1", parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
  //await updateUser(CS1ScoresID,"CS1", CS1HighScore, CS1TotalCorrect, CS1TotalAttempted);
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updating Total Table
  const postUpdateCredentials = await userModel.find({
    _id: _id
  });
  var val2 = await getTotalScores(postUpdateCredentials);
  await updateTotal(val2[0], parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updating LeaderBoard Table
  // Checking To see if record Exist
  await updateLeaderboard(leaderboardModelCS1, postUpdateCredentials, _id, parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
  await updateLeaderboard(leaderboardModelTotal, postUpdateCredentials, _id, parseInt(val2[0]), parseInt(val2[1]), parseInt(val2[2]));
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
  var val = getScores(credentials, 'CS2',score);
  await updateUser(val[0],'CS2', parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updating Total Table
  const postUpdateCredentials = await userModel.find({
    _id: _id
  });
  var val2 = await getTotalScores(postUpdateCredentials);
  await updateTotal(val2[0], parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updating LeaderBoard Table
  // Checking To see if record Exist
  await updateLeaderboard(leaderboardModelCS2, postUpdateCredentials, _id, parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
  await updateLeaderboard(leaderboardModelTotal, postUpdateCredentials, _id, parseInt(val2[0]), parseInt(val2[1]), parseInt(val2[2]));
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
//Fucntions to Support the API End Points
function getScores (credentials, category,score)
{
  var highScore = credentials[0].Scores[0][category][0].HighScore;
  var totalCorrect = credentials[0].Scores[0][category][0].TotalCorrect
  var totalAttempted = credentials[0].Scores[0][category][0].TotalAttempted;
  var scoresID = credentials[0].Scores[0][category][0]._id;
  if (parseInt(score) > highScore) {
    highScore = parseInt(score);
  }
  totalCorrect = parseInt(totalCorrect + parseInt(score));
  totalAttempted += numberOfQuestionsPerSession;

  var val = [scoresID,highScore,totalCorrect,totalAttempted]
  return val
}
async function getTotalScores (postUpdateCredentials)
{
  var totalHighScore = getTotalHighScore(postUpdateCredentials);
  var totalCorrect =  getTotalCorrect(postUpdateCredentials);
  var totalAttempted = getTotalAttempted(postUpdateCredentials);
  var totalID = postUpdateCredentials[0].Scores[0].Total[0]._id;
  var val = [totalID,totalHighScore,totalCorrect,totalAttempted];
  return val
}
function getTotalHighScore(credentials) {
  // Intro Scores
  var introHighScore = credentials[0].Scores[0].Intro[0].HighScore;
  // CS1 Scores
  var CS1HighScore = credentials[0].Scores[0].CS1[0].HighScore;

  // CS2 Scores
  var CS2HighScore = credentials[0].Scores[0].CS2[0].HighScore;

  return introHighScore + CS1HighScore + CS2HighScore
}
function getTotalCorrect(credentials) {
  // Intro Scores
  var introTotalCorrect = credentials[0].Scores[0].Intro[0].TotalCorrect;

  // CS1 Scores
  var CS1TotalCorrect = credentials[0].Scores[0].CS1[0].TotalCorrect;

  // CS2 Scores
  var CS2TotalCorrect = credentials[0].Scores[0].CS2[0].TotalCorrect;

  return introTotalCorrect + CS1TotalCorrect + CS2TotalCorrect
}
function getTotalAttempted(credentials) {
  // Intro Scores
  var introTotalAttempted = credentials[0].Scores[0].Intro[0].TotalAttempted;

  // CS1 Scores
  var CS1TotalAttempted = credentials[0].Scores[0].CS1[0].TotalAttempted;

  // CS2 Scores
  var CS2TotalAttempted = credentials[0].Scores[0].CS2[0].TotalAttempted;

  return introTotalAttempted + CS1TotalAttempted + CS2TotalAttempted
}
async function updateUser(scoreID, category, highScore, totalCorrect, totalAttempted) {
  await userModel.findOneAndUpdate({
      [`Scores.${category}._id`]: scoreID
    }, {
      "$set": {
        [`Scores.0.${category}.$.HighScore`]: highScore,
        [`Scores.0.${category}.$.TotalCorrect`]: totalCorrect,
        [`Scores.0.${category}.$.TotalAttempted`]: totalAttempted
      }
    },
    function (err) {
      if (err) {
        console.log(err);
        error = err;
        phase1 = 'Failure';
      } else {
        phase1 = 'Success';
      }
    }
  );
}
async function updateTotal(totalScoresID, totalHighScore, totalTotalCorrect, totalTotalAttempted) {
  await userModel.findOneAndUpdate({
      "Scores.Total._id": totalScoresID
    }, {
      "$set": {
        "Scores.0.Total.$.HighScore": totalHighScore,
        "Scores.0.Total.$.TotalCorrect": totalTotalCorrect,
        "Scores.0.Total.$.TotalAttempted": totalTotalAttempted
      }
    },
    function (err, result) {
      if (err) {
        console.log(err);
        error = err;
        phase2 = 'Failure';;
      } else {
        phase2 = 'Success';
      }
    }
  );
}
async function updateLeaderboard(model, credentials, _id, totalHighScore, totalCorrect, totalAttempted) {
  if (await model.exists({
      // Fix this 
      UserID: _id
    })) {
    await model.findOneAndUpdate({
        "UserID": _id
      }, {
        "$set": {
          "HighScore": totalHighScore,
          "TotalCorrect": totalCorrect,
          "TotalAttempted": totalAttempted
        }
      },
      function (err) {
        if (err) {
          console.log(err);
          phase3 = 'Failure';
          error = err;
        } else {
          console.log("Updated LeaderBoard");
          phase3 = 'Success';
        }
      }
    );
  } else {
    var leaderboardInstance = new model({
      UserID: _id,
      FirstName: firstName,
      LastName: lastName,
      HighScore: credentials[0].Scores[0].Total[0].HighScore,
      TotalCorrect: credentials[0].Scores[0].Total[0].TotalCorrect,
      TotalAttempted: credentials[0].Scores[0].Total[0].TotalAttempted
    })
    await leaderboardInstance.save().then(result => {
        console.log("Created LeaderBoard");
        phase3 = 'Success';
      })
      .catch(err => {
        console.log('Save() Exception: ', err);
        error = err;
        phase3 = 'Failure';
      });
  }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Add API end points here that call external functions 
app.get('/', function (request, response) {
  response.send('Hello World!')
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`);
});
