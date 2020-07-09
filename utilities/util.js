const numberOfQuestionsPerSession = 20;
const userModel = require('../models/users'); 

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
function getTotalScores (postUpdateCredentials)
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
async function updateLeaderboard(model, credentials, _id, category, firstName, lastName, totalHighScore, totalCorrect, totalAttempted) {
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
      HighScore: credentials[0].Scores[0][category][0].HighScore,
      TotalCorrect: credentials[0].Scores[0][category][0].TotalCorrect,
      TotalAttempted: credentials[0].Scores[0][category][0].TotalAttempted
    });
    leaderboardInstance.save().then(result => {
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

module.exports = 
{
    getScores,
    getTotalScores,
    getTotalCorrect,
    getTotalAttempted,
    updateUser,
    updateTotal,
    updateLeaderboard
}