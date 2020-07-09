
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema Model 
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
  module.exports = mongoose.model('leaderboardCS1', leaderboardSchema); 
