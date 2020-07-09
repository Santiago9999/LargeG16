const mongoose = require('mongoose');
//const users = require('../models/users');
var Schema = mongoose.Schema;
const MONGODB_URI = "mongodb+srv://Wildsoul:Katara@cluster0-xs7yp.mongodb.net/CS2EZ?retryWrites=true&w=majority";

const UsersSchema = new Schema({ 
	ID: Number,
	FirstName: String,
	LastName: String, 
	Email: String,
	Password: String,
	//Scores: [ScoresSchema]
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true,}); 
mongoose.connection.once('open', function() 
{
    var db = mongoose.connection;
    console.log('Connected to the Database.');
    const userSchema = mongoose.model("userss", UsersSchema);
    var userInstance = new userSchema({
            ID: 5, // Figure out how to auto increment
            FirstName: 'FredFlint', // Limitations such as if no name is present return err
            LastName: 'Bedrock',
            Email: 'Fred',
            Password: 'Flintstone',
    });
    userInstance.save().then(result => 
        {
          console.log(result);
          mongoose.disconnect();
        })
        .catch(err => 
        {
          error = err;
          console.log('Save() Exception: ', err);
          mongoose.disconnect();
        });
});

//Fucntions to Support the API End Points
// function getScores (credentials, category,score)
// {
//   var highScore = credentials[0].Scores[0][category][0].HighScore;
//   var totalCorrect = credentials[0].Scores[0][category][0].TotalCorrect
//   var totalAttempted = credentials[0].Scores[0][category][0].TotalAttempted;
//   var scoresID = credentials[0].Scores[0][category][0]._id;
//   if (parseInt(score) > highScore) {
//     highScore = parseInt(score);
//   }
//   totalCorrect = parseInt(totalCorrect + parseInt(score));
//   totalAttempted += numberOfQuestionsPerSession;

//   var val = [scoresID,highScore,totalCorrect,totalAttempted]
//   return val
// }
// function getTotalScores (postUpdateCredentials)
// {
//   var totalHighScore = getTotalHighScore(postUpdateCredentials);
//   var totalCorrect =  getTotalCorrect(postUpdateCredentials);
//   var totalAttempted = getTotalAttempted(postUpdateCredentials);
//   var totalID = postUpdateCredentials[0].Scores[0].Total[0]._id;
//   var val = [totalID,totalHighScore,totalCorrect,totalAttempted];
//   return val
// }
// function getTotalHighScore(credentials) {
//   // Intro Scores
//   var introHighScore = credentials[0].Scores[0].Intro[0].HighScore;
//   // CS1 Scores
//   var CS1HighScore = credentials[0].Scores[0].CS1[0].HighScore;

//   // CS2 Scores
//   var CS2HighScore = credentials[0].Scores[0].CS2[0].HighScore;

//   return introHighScore + CS1HighScore + CS2HighScore
// }
// function getTotalCorrect(credentials) {
//   // Intro Scores
//   var introTotalCorrect = credentials[0].Scores[0].Intro[0].TotalCorrect;

//   // CS1 Scores
//   var CS1TotalCorrect = credentials[0].Scores[0].CS1[0].TotalCorrect;

//   // CS2 Scores
//   var CS2TotalCorrect = credentials[0].Scores[0].CS2[0].TotalCorrect;

//   return introTotalCorrect + CS1TotalCorrect + CS2TotalCorrect
// }
// function getTotalAttempted(credentials) {
//   // Intro Scores
//   var introTotalAttempted = credentials[0].Scores[0].Intro[0].TotalAttempted;

//   // CS1 Scores
//   var CS1TotalAttempted = credentials[0].Scores[0].CS1[0].TotalAttempted;

//   // CS2 Scores
//   var CS2TotalAttempted = credentials[0].Scores[0].CS2[0].TotalAttempted;

//   return introTotalAttempted + CS1TotalAttempted + CS2TotalAttempted
// }
// async function updateUser(scoreID, category, highScore, totalCorrect, totalAttempted) {
//   await userModel.findOneAndUpdate({
//       [`Scores.${category}._id`]: scoreID
//     }, {
//       "$set": {
//         [`Scores.0.${category}.$.HighScore`]: highScore,
//         [`Scores.0.${category}.$.TotalCorrect`]: totalCorrect,
//         [`Scores.0.${category}.$.TotalAttempted`]: totalAttempted
//       }
//     },
//     function (err) {
//       if (err) {
//         console.log(err);
//         error = err;
//         phase1 = 'Failure';
//       } else {
//         phase1 = 'Success';
//       }
//     }
//   );
// }
// async function updateTotal(totalScoresID, totalHighScore, totalTotalCorrect, totalTotalAttempted) {
//   await userModel.findOneAndUpdate({
//       "Scores.Total._id": totalScoresID
//     }, {
//       "$set": {
//         "Scores.0.Total.$.HighScore": totalHighScore,
//         "Scores.0.Total.$.TotalCorrect": totalTotalCorrect,
//         "Scores.0.Total.$.TotalAttempted": totalTotalAttempted
//       }
//     },
//     function (err, result) {
//       if (err) {
//         console.log(err);
//         error = err;
//         phase2 = 'Failure';;
//       } else {
//         phase2 = 'Success';
//       }
//     }
//   );
// }
// async function updateLeaderboard(model, credentials, _id, category, firstName, lastName, totalHighScore, totalCorrect, totalAttempted) {
//   if (await model.exists({
//       // Fix this 
//       UserID: _id
//     })) {
//     await model.findOneAndUpdate({
//         "UserID": _id
//       }, {
//         "$set": {
//           "HighScore": totalHighScore,
//           "TotalCorrect": totalCorrect,
//           "TotalAttempted": totalAttempted
//         }
//       },
//       function (err) {
//         if (err) {
//           console.log(err);
//           phase3 = 'Failure';
//           error = err;
//         } else {
//           console.log("Updated LeaderBoard");
//           phase3 = 'Success';
//         }
//       }
//     );
//   } else {
//     var leaderboardInstance = new model({
//       UserID: _id,
//       FirstName: firstName,
//       LastName: lastName,
//       HighScore: credentials[0].Scores[0][category][0].HighScore,
//       TotalCorrect: credentials[0].Scores[0][category][0].TotalCorrect,
//       TotalAttempted: credentials[0].Scores[0][category][0].TotalAttempted
//     });
//     leaderboardInstance.save().then(result => {
//         console.log("Created LeaderBoard");
//         phase3 = 'Success';
//       })
//       .catch(err => {
//         console.log('Save() Exception: ', err);
//         error = err;
//         phase3 = 'Failure';
//       });
//   }
// }


// const MAIN_DB = dbclient.db('CS2EZ');
// const USERS_COLLECTION = MAIN_DB.collection('users');
// console.log('Connected succesfully to database: ' + MAIN_DB.databaseName);

// MAIN_DB.stats((err, result) => {
//     console.log('DB STATS: ' + JSON.stringify(result, undefined,2));
// });
// var user = new UsersSchema({
//     ID: 5,
//     FirstName: 'FredFlint',
//     LastName: 'Bedrock',
//     Email: 'Fred',
//     Password: 'Flintstone',
// });

// user.save().then(result => {
//         console.log(result);
//         dbclient.close();
//     })
//     .catch(err => {
//         console.log('Save() Exception: ', err);
//         dbclient.close();
//     });

// USERS_COLLECTION.insertOne({"firstName" : "Jose"}, (err,result)=>
// {
//     if(err)
//     {
//         return console.log ("There was an error " + err );
//     }
//     console.log("Interted " + JSON.stringify(result.ops));
//     dbclient.close();
// })

// dbclient.close();