
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema Model 

const ScoresSchema = new Schema({ 
	Intro: Number,
	CS1: Number, 
	CS2: Number,
});

const UsersSchema = new Schema({ 
	ID: Number,
	FirstName: String,
	LastName: String, 
	Email: String,
	Password: String,
	//Scores: [ScoresSchema]
});

module.exports = mongoose.model('users', UsersSchema); 

