//const numberOfQuestionsPerSession = 20;
const userModel = require('../models/users');
var error = '';
var result ='';

function getScores(credentials, category,  numberOfCorrect,numberOfAttempted) {
  var highScore = credentials[0].Scores[0][category][0].HighScore;
  var totalCorrect = credentials[0].Scores[0][category][0].TotalCorrect
  var totalAttempted = credentials[0].Scores[0][category][0].TotalAttempted;
  var scoresID = credentials[0].Scores[0][category][0]._id;
  if (parseInt(numberOfCorrect) > highScore) {
    highScore = parseInt(numberOfCorrect);
  }
  totalCorrect = parseInt(totalCorrect + parseInt(numberOfCorrect));
  totalAttempted += numberOfAttempted;

  var val = [scoresID, highScore, totalCorrect, totalAttempted]
  return val
}

function getTotalScores(postUpdateCredentials) {
  var totalHighScore = getTotalHighScore(postUpdateCredentials);
  var totalCorrect = getTotalCorrect(postUpdateCredentials);
  var totalAttempted = getTotalAttempted(postUpdateCredentials);
  var totalID = postUpdateCredentials[0].Scores[0].Total[0]._id;
  var val = [totalID, totalHighScore, totalCorrect, totalAttempted];
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
        console.log("Unsuccessfully Updated User " + category);
        result = "Unsuccessfull";
        var ret = {
          Result: result,
          Error: error
        }
        res.status(500).json(ret);
        return
      } else {
        console.log("Successfully Updated User " + category);
      }
    }
  );
  return error
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
    function (err) {
      if (err) {
        console.log(err);
        console.log("Unsuccessfully Updated Total");
        error = err;
        result = "Unsuccessfull";
        var ret = {
          Result: result,
          Error: error
        }
        res.status(500).json(ret);
        return;
      } else {
        console.log("Successfully Updated Total");
      }
    }
  );
  return error
}
async function updateLeaderboard(model, credentials, _id, category, firstName, lastName, totalHighScore, totalCorrect, totalAttempted) {
  if (await model.exists({
      // Fix this 
      UserID: _id
    })) {
    await model.findOneAndUpdate({
        "UserID": _id
      }, {
        "$set": {
          "FirstName": firstName,
          "LastName": lastName,
          "HighScore": totalHighScore,
          "TotalCorrect": totalCorrect,
          "TotalAttempted": totalAttempted
        }
      },
      function (err) {
        if (err) {
          console.log(err);
          console.log("Unsuccessfully Updated LeaderBoard " + category);
          error = err;
          result = "Unsuccessfull";
          var ret = {
            Result: result,
            Error: error
          }
          res.status(500).json(ret);
          return
        } else {
          console.log("Successfully Updated LeaderBoard " + category);
        }
      }
    );
  } else {
    var leaderboardInstance = new model({
      UserID: _id,
      FirstName: firstName,
      LastName: lastName,
      HighScore: credentials[0].Scores[0][category][0].HighScore,
      TotalCorrect: credentials[0].Scores[0][category][0].TotalCorrect,
      TotalAttempted: credentials[0].Scores[0][category][0].TotalAttempted
    });
    leaderboardInstance.save().then(result => {
        console.log("Successfully Created LeaderBoard " + category);
      })
      .catch(err => {
        console.log("Unsuccessfully Updated LeaderBoard " + category);
        error = err;
      });
  }
  return error
}
async function postUpdate(primaryModel, secondaryModel, tertiaryModel, req, category, res){
  console.log('We are currently in the Update' + category + ' API');
  console.log(req.body);
  const {
    _id,
    firstName,
    lastName,
    numberOfCorrect,
    numberOfAttempted
  } = req.body;
  var numberOfCorrect2 = parseInt(numberOfCorrect);
  var numberOfAttempted2 = parseInt(numberOfAttempted);
  const credentials = await primaryModel.find({
    _id: _id
  }, function (err) {
    if (err) {
      result = "Unsuccessfull";
      console.log(err);
      error = err;
      var ret = {
        Result: result,
        Error: error
      }
      res.status(500).json(ret);
      return;
    }
  });
  if (credentials.length == 0)
  {
    error = "No Users Found";
    var ret = {
      Result: result,
      Error: error
    }
    res.status(500).json(ret);
    return;
  }
  // Getting Previous Values
  var val = getScores(credentials, category, numberOfCorrect2,numberOfAttempted2);
  var phase1 = await updateUser(val[0], category, parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updating Total Table
  const postUpdateCredentials = await primaryModel.find({
    _id: _id
  });
  var val2 = getTotalScores(postUpdateCredentials);
  var phase2 = await updateTotal(val2[0], parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Updating LeaderBoard Table
  // Checking To see if record Exist
  var phase3 = await updateLeaderboard(secondaryModel, postUpdateCredentials, _id, category, firstName, lastName, parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
  var phase4 = await updateLeaderboard(tertiaryModel, postUpdateCredentials, _id, 'Total', firstName, lastName, parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));

  (phase1 == '') ? phase1 = "Successfull": phase1 = "Unsuccessfull: " + phase1;
  (phase2 == '') ? phase2 = "Successfull": phase2 = "Unsuccessfull: " + phase1;
  (phase3 == '') ? phase3 = "Successfull": phase3 = "Unsuccessfull: " + phase1;
  (phase4 == '') ? phase4 = "Successfull": phase4 = "Unsuccessfull: " + phase1;

  var ret = {
    Phase1: phase1,
    Phase2: phase2,
    Phase3: phase3,
    Phase4: phase4,
  }
  res.status(200).json(ret);
  return;
}

module.exports = {
  getScores,
  getTotalScores,
  getTotalCorrect,
  getTotalAttempted,
  updateUser,
  updateTotal,
  updateLeaderboard,
  postUpdate
}