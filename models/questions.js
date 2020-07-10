
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema Model 
const questions = new Schema({
    Question: {
      type: String, required: true
    },
    PossibleAnswer1: {
      type: String, required: true
    },
    PossibleAnswer2: {
      type: String, required: true
    },
    PossibleAnswer3: {
      type: String, required: true
    },
    PossibleAnswer4: {
      type: String, required: true
    },
    CorrectAnswer: {
      type: String, required: true
    }
  });
  module.exports = mongoose.model('questions', questions); 
