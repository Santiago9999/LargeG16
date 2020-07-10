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
		type: String
	},
	LastName: {
		type: String
	},
	Email: {
		type: String
	},
	Password: {
		type: String
	},
	Validated: {
		type: Number
	},
	Scores: [UserScores]
});
module.exports = mongoose.model('users', UsersSchema);
