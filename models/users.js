
const mongoose = require('mongoose');

// Create Schema Model 

const ScoresSchema = new mongoose.Schema({ 
	Intro: Number,
	CS1: Number, 
	CS2: Number,
});

const UsersSchema = new mongoose.Schema({ 
	ID: Number,
	FirstName: String,
	LastName: String, 
	Email: String,
	Password: String,
	Scores: [ScoresSchema]
});

module.exports = mongoose.model('Users', UsersSchema); 
