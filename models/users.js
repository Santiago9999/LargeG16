const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema Model 

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
		type: String, required: true
	},
	LastName: {
		type: String , required: true
	},
	Email: {
		type: String , required: true
	},
	Password: {
		type: String ,required: true
	},
	Validated: {
		type: Number ,required: true
	},
	Date: {
		type : Date, default: Date.now
	},
	Scores: [UserScores]
});
module.exports = mongoose.model('users', UsersSchema);
