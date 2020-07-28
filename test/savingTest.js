const mocha = require('mocha');
const assert = require('assert');
const userModel = require('../models/users');
const leaderboardModelIntro = require('../models/leaderboardIntro');
const cors = require('cors');
const mongoose = require('mongoose');
//const util = require('./utilities/util')
const path = require('path');   
const MONGODB_URI = "mongodb+srv://Wildsoul:Katara@cluster0-xs7yp.mongodb.net/CS2EZ?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
// Descrbibe Test
describe('Saving Records', function()
{
    //Create test
    it('Saving Record to Database', function(done){
        this.timeout(10000);
        var example = new userModel({
            FirstName: "Testy",
            LastName: "Test",
            Email: "TestyTest@Testing.com",
            Password: "TestyPassword",
            Validated: 0,
            ValidateCode: "111111111",
            Scores: [{
                Intro: [{
                    HighScore: 0,
                    TotalCorrect: 0,
                    TotalAttempted: 0
                }],
                CS1: [{
                    HighScore: 0,
                    TotalCorrect: 0,
                    TotalAttempted: 0
                }],
                CS2: [{
                    HighScore: 0,
                    TotalCorrect: 0,
                    TotalAttempted: 0
                }],
                Total: [{
                    HighScore: 0,
                    TotalCorrect: 0,
                    TotalAttempted: 0
                }]
            }]
        });
         example.save().then(function(){
            assert(!example.isNew);
            done();
        });
    });
    it('Gettign Leaderboard', function(done){
        this.timeout(10000);
        leaderboardModelIntro.find().sort({
            'HighScore': -1
        }).limit(20).then(reviews => {
            console.log(reviews);
            assert(reviews != null);
            done();
        });
        });
    // Next Test
});