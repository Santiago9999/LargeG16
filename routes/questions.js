const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//----------------------------------------------------------------------------------------------------------
// Schemas
const questionModel = require('../models/questions');

module.exports = {
    postQuestions: async (req, res, next) => {
        console.log('We are currently in the postQuestions API');
        var results = '';
        var error = '';
        console.log(req.body);
        const {
            question,
            possibleAnswer1,
            possibleAnswer2,
            possibleAnswer3,
            possibleAnswer4,
            correctAnswer,
        } = req.body;
        // check for duplicate questions
        if (await questionModel.exists({
                Question: question
            })) {
            results = "Unsuccessfull";
            error = "Question Already Exist";

        } else {
            var questionInstance = new questionModel({
                Question: question,
                PossibleAnswer1: possibleAnswer1,
                PossibleAnswer2: possibleAnswer2,
                PossibleAnswer3: possibleAnswer3,
                PossibleAnswer4: possibleAnswer4,
                CorrectAnswer: correctAnswer,
            });
            await questionInstance.save().then(result => {
                    console.log("Answer Created");
                    results = result;
                })
                .catch(err => {
                    console.log('Save() Exception: ', err);
                    error = err;
                });
        }
        // add question to databse
        var phase1 = "Success";
        var ret = {
            Result : results,
            Error : error
        }
        res.status(200).json(ret);
    },
    getQuestions: async (req, res, next) => {
        console.log('We are currently in the Get Questions API');
        var leaderBoard = await questionModel.find().sort({
            'HighScore': -1
        }).limit(20).then(reviews => {
            res.status(200).json(reviews);
        });
    }
}
