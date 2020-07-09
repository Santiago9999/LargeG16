const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const util = require('../utilities/util');
//----------------------------------------------------------------------------------------------------------
// Schemas
const userModel = require('../models/users');
const leaderboardModelIntro = require('../models/leaderboardIntro');
const leaderboardModelCS1 = require('../models/leaderboardCS1');
const leaderboardModelCS2 = require('../models/leaderboardCS2');
const leaderboardModelTotal = require('../models/leaderboardTotal');

module.exports = {
    postUpdateIntro :  async (req, res, next) => {
        console.log('We are currently in the UpdateIntro API');
        console.log(req.body);
        const {
          _id,
          firstName,
          lastName,
          score
        } = req.body;
        const credentials = await userModel.find({
          _id: _id
        }, function (err) {
          if (err) {
            console.log(err);
            error = err;
          }
        });
        // Getting Previous Values
        var val = util.getScores(credentials,'Intro',score);
        await util.updateUser(val[0],'Intro', parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Updating Total Table
        const postUpdateCredentials = await userModel.find({
          _id: _id
        });
        var val2 = util.getTotalScores(postUpdateCredentials);
        await util.updateTotal(val2[0], parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Updating LeaderBoard Table
        // Checking To see if record Exist
        await util.updateLeaderboard(leaderboardModelIntro, postUpdateCredentials, _id, 'Intro', firstName, lastName, parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
        await util.updateLeaderboard(leaderboardModelTotal, postUpdateCredentials, _id, 'Total',firstName, lastName, parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
        var phase1 = "Success";
        var ret = {
            Phase1: phase1,
        }
        res.status(200).json(ret);
      },
    postUpdateCS1: async (req, res, next) => {
        console.log('We are currently in the UpdateCS1 API');
        console.log(req.body);
        const {
            _id,
            firstName,
            lastName,
            score
        } = req.body;
        const credentials = await userModel.find({
            _id: _id
        }, function (err) {
            if (err) {
                console.log(err);
                error = err;
            }
        });
        // Getting Previous Values
        var val = util.getScores(credentials, 'CS1', score);
        await util.updateUser(val[0], 'CS1', parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Updating Total Table
        const postUpdateCredentials = await userModel.find({
            _id: _id
        });
        var val2 = util.getTotalScores(postUpdateCredentials);
        await util.updateTotal(val2[0], parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Updating LeaderBoard Table
        // Checking To see if record Exist
        await util.updateLeaderboard(leaderboardModelCS1, postUpdateCredentials, _id, 'CS1', firstName, lastName, parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
        await util.updateLeaderboard(leaderboardModelTotal, postUpdateCredentials, _id, 'Total', firstName, lastName, parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
        var phase1 = "Success";
        var ret = {
            Phase1: phase1,
        }
        res.status(200).json(ret);
    },
    postUpdateCS2: async (req, res, next) => {
        console.log('We are currently in the UpdateCS2 API');
        console.log(req.body);
        const {
            _id,
            firstName,
            lastName,
            score
        } = req.body;
        const credentials = await userModel.find({
            _id: _id
        }, function (err) {
            if (err) {
                console.log(err);
                //error = err;
            }
        });
        // Getting Previous Values
        var val = util.getScores(credentials, 'CS2', score);
        await util.updateUser(val[0], 'CS2', parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Updating Total Table
        const postUpdateCredentials = await userModel.find({
            _id: _id
        });
        var val2 = util.getTotalScores(postUpdateCredentials);
        await util.updateTotal(val2[0], parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
        //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Updating LeaderBoard Table
        // Checking To see if record Exist
        await util.updateLeaderboard(leaderboardModelCS2, postUpdateCredentials, _id, 'CS2', firstName, lastName, parseInt(val[1]), parseInt(val[2]), parseInt(val[3]));
        await util.updateLeaderboard(leaderboardModelTotal, postUpdateCredentials, _id, 'Total', firstName, lastName, parseInt(val2[1]), parseInt(val2[2]), parseInt(val2[3]));
        var phase1 = "Success";
        var ret = {
            Phase1: phase1,
        }
        res.status(200).json(ret);
    }
}
