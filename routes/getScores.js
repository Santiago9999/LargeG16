const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//----------------------------------------------------------------------------------------------------------
// Schemas
const leaderboardModelIntro = require('../models/leaderboardIntro');
const leaderboardModelCS1 = require('../models/leaderboardCS1');
const leaderboardModelCS2 = require('../models/leaderboardCS2');
const leaderboardModelTotal = require('../models/leaderboardTotal');

module.exports = {
    getIntroHighScores: async (req, res, next) => {
        console.log('We are currently in the Get Intro HighScores API');
        console.log(req.body);
        const {
            numberOfSpots
        } = req.body;
        var limit = parseInt(numberOfSpots);
        var leaderBoard = await leaderboardModelIntro.find().sort({
            'HighScore': -1
        }).limit(limit).then(reviews => {
            res.status(200).json(reviews)
        });
    },
    getCS1HighScores: async (req, res, next) => {
        console.log('We are currently in the Get CS1 HighScores API');
        console.log(req.body);
        const {
            numberOfSpots
        } = req.body;
        var limit = parseInt(numberOfSpots);
        var leaderBoard = await leaderboardModelCS1.find().sort({
            'HighScore': -1
        }).limit(limit).then(reviews => {
            res.status(200).json(reviews)
        });
    },
    getCS2HighScores: async (req, res, next) => {
        console.log('We are currently in the Get CS2 HighScores API');
        console.log(req.body);
        const {
            numberOfSpots
        } = req.body;
        var limit = parseInt(numberOfSpots);
        var leaderBoard = await leaderboardModelCS2.find().sort({
            'HighScore': -1
        }).limit(limit).then(reviews => {
            res.status(200).json(reviews)
        });
    },
    getTotalHighScores: async (req, res, next) => {
        console.log('We are currently in the Get Total HighScores API');
        console.log(req.body);
        const {
            numberOfSpots
        } = req.body;
        var limit = parseInt(numberOfSpots);
        var leaderBoard = await leaderboardModelTotal.find().sort({
            'HighScore': -1
        }).limit(limit).then(reviews => {
            res.status(200).json(reviews)
        });
    }
}
