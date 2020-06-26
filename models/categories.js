// models/articles.js
const mongoose = require('mongoose');

// Create Schema Model 

const QuestionSchema = new mongoose.Schema({ 
	Question: Number,
	1: String,
	2: String,
	3: String,
	4: String,
	Answer: Number
});

const CategorySchema = new mongoose.Schema({ 
	Intro: [QuestionSchema],
	CS1: [QuestionSchema], 
	CS2: [QuestionSchema]
});

module.exports = mongoose.model('Categories', CategorySchema); 
