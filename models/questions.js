
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema Model 
const questions = new Schema({
    Question: {
      type: String
    },
    PossibleAnswer1: {
      type: String
    },
    PossibleAnswer2: {
      type: String
    },
    PossibleAnswer3: {
      type: String
    },
    PossibleAnswer4: {
      type: String
    },
    CorrectAnswer: {
      type: String
    }
  });
  module.exports = mongoose.model('questions', questions); 
