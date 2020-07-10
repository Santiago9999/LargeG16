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
        util.postUpdate(userModel,leaderboardModelIntro,leaderboardModelTotal, req, 'Intro',res);
      },
    postUpdateCS1: async (req, res, next) => {
        util.postUpdate(userModel,leaderboardModelCS1,leaderboardModelTotal, req, 'CS1',res);
    },
    postUpdateCS2: async (req, res, next) => {
        util.postUpdate(userModel,leaderboardModelCS2,leaderboardModelTotal, req, 'CS2',res);
    }    
}
