const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
//----------------------------------------------------------------------------------------------------------
// Schemas
const userModel = require('../models/users');

module.exports = {
    login: async (req, res, next) => {
        console.log('We are currently in the login API');
        console.log(req.body);
        //response.send(req.body);
        const {
            email,
            password
        } = req.body;
        console.log('Data Recieved Email: ' + email + ' Password: ' + password)
        // Find the Users other fields
        const credentials = await userModel.find({
            Email: email,
            Password: password
        }, function (err) {
            if (err) {
                console.log(err);
                error = err;
            }
        });
        // No errors on using the find function
        console.log(credentials);
        if (credentials.length > 0) {
            var id = credentials[0]._id;
            console.log('ID: ' + id);

            var firstName = credentials[0].FirstName;
            console.log('First Name: ' + firstName);

            var lastName = credentials[0].LastName;
            console.log('Last Name: ' + lastName);

            var introScore = credentials[0].Scores[0].Intro[0];
            console.log('Intro Array: ' + introScore);

            var CS1Score = credentials[0].Scores[0].CS1[0];
            console.log('CS1 Array: ' + CS1Score);

            var CS2Score = credentials[0].Scores[0].CS2[0];
            console.log('CS1 Array:  ' + CS2Score);

            var totalScore = credentials[0].Scores[0].Total[0];
            console.log('Total Array:  ' + totalScore);

            error = 'Sucess';
        } else {
            console.log('No records found');
            error = 'No Records found';
        }

        // Creating JSON Package to Send back 
        var ret = {
            ID: id,
            firstName: firstName,
            lastName: lastName,
            intro: introScore,
            CS1: CS1Score,
            CS2: CS2Score,
            Total: totalScore,
            error: error
        }

        // Everything is Good, we are sending back a JSON Package
        res.status(200).json(ret);
    },
    register: async (req, res, next) => {
        console.log('We are currently in the register API');
        console.log(req.body);
        //response.send(req.body);
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        console.log('Data Recieved \nEmail: ' + email + ' Password: ' + password + ' FirstName: ' + firstName + ' LastName: ' + lastName);
        // Check if User already Exist
        const credentials = await userModel.find({
            Email: email,
            Password: password
        }, function (err) {
            if (err) {
                console.log(err);
                error = err;
            }
        });
        if (credentials.length == 0) {
            console.log('No records Found');
            var userInstance = new userModel({
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Password: password,
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
            userInstance.save().then(result => {
                    console.log(result);
                    error = 'Sucess';
                    var ret = {
                        firstName: firstName,
                        lastName: lastName,
                        error: error
                    }
                })
                .catch(err => {
                    error = err;
                    console.log('Save() Exception: ', err);
                });
        } else {
            console.log('User Already Exist')
            error = 'User Name Already Exist';
        }
        var ret = {
            firstName: firstName,
            lastName: lastName,
            error: error
        }
        // Everything is Good, we are sending back a JSON Package
        res.status(200).json(ret);
    }

}
