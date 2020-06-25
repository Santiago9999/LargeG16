// models/articles.js
const mongoose = require('mongoose');

// Create Schema Model 

const UsersSchema = new mongoose.Schema({ 
	ID: Number,
	FirstName: String,
	LastName: String, 
	Email: String,
	Password: String,
	Scores: [ScoresSchema]
});

const ScoresSchema = new mongoose.Schema({ 
	Intro: Number,
	CS1: Number, 
	CS2: Number,
});


module.exports = mongoose.model('users', UsersSchema); 
