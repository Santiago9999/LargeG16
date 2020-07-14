const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const nodeMailer = require('nodemailer');
var crypto = require("crypto");
require('dotenv').config({ path : '../private/private.env'});     
//----------------------------------------------------------------------------------------------------------
// Schemas
const userModel = require('../models/users');
const {
    info
} = require('console');
const {
    json
} = require('body-parser');
var result = '';
var error = '';
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
                result = "Unsuccessfull";
                console.log(err);
                error = err;
            }
            var ret = {
                Result: result,
                Error: error
            }
        });
        // No errors on using the find function
        if (credentials[0].Validated == 1) {
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
        } else {
            console.log("Account not validated")
            result = "Unsuccessfull";
            error = "Account not validated"
        }
    },
    register: async (req, res, next) => {
        console.log('We are currently in the register API');
        console.log(req.body);
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
        });
        var randomCode = crypto.randomBytes(4).toString('hex');
        if (credentials.length == 0) {
            console.log('No records Found');
            var userInstance = new userModel({
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Password: password,
                Validated: 0,
                ValidatedCode: randomCode,
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
            console.log(process.env.GMAIL_USERNAME);
            console.log(process.env.GMAIL_PASSWORD);
            await userInstance.save(function (err) {
                if (err) {
                    console.log('Failed to add user');
                    result = 'Unsuccessfull';
                    console.log(result);
                    error = err;
                } else {
                    result = 'Success';
                    var transporter = nodeMailer.createTransport({
                        service: 'gmail',
                        secure: true,
                        auth: {
                            user: 'triviacreviceg16@gmail.com',
                            pass: 'PQ4RQ6ARAbNJMTtZvZf'
                        }
                    });
                    //randomCode = crypto.randomBytes(4).toString('hex');
                    var mailOPtions = {
                        from: 'triviacreviceg16@gmail.com',
                        to: email,
                        subject: 'Email Verification for TrivaCrevice',
                        text: 'Hello ' + firstName + 'Thank you for registering for TriviaCrevice \n Please Enter the Following Code to Validade you account \n This is your Code : ' + randomCode + ' \nIf you did not register for TriviaCrevice please ignore this email, Please signup now'
                    }
                    transporter.sendMail(mailOPtions, function (err, info) {
                        if (err) {
                            result = "Unsuccesfull";
                            error = "Failed to Send Email";
                            console.log(error);
                        } else {
                            console.log('Email Send: ' + info.response);
                            result = "Succesfull";
                        }
                    });
                }
            });
        } else {
            console.log('User Already Exist');
            result = 'Unsuccessfull';
            error = 'User Name Already Exist';
        }
        if (await userModel.exists({
                // Fix this 
                Email: email
            })) {
            var ret = {
                firstName: firstName,
                lastName: lastName,
                ValidatedCode: randomCode,
                result: result,
                error: error
            }
            console.log('Successfull Test');
            res.status(200).json(ret);
        } else {
            result = 'Unsuccessfull';
            var ret = {
                firstName: firstName,
                lastName: lastName,
                result: result,
                error: error
            }
            console.log('Unsuccessfull Test');
            return res.status(200).json(ret);
        }
    },
    changePassword: async (req, res, next) => {
        console.log('We are currently in the change password API');
        const {
            email,
            password
        } = req.body;
        const credentials = await userModel.find({
            Email: email
        }, function (err) {
            if (err) {
                console.log(err);
                result = "Unsuccessfull";
                error = err;
                var ret = {
                    Result: result,
                    Error: error
                }
                res.status(500).json(ret);
                return
            }
        });
        if (credentials[0].Password == password) {
            console.log("Password is the same as the previous password");
            result = "Unsuccessfull";
            error = "Password is the same as the previous password";
        } else {
            await userModel.findOneAndUpdate({
                    "Email": email
                }, {
                    "$set": {
                        "Password": password,
                    }
                },
                function (err) {
                    if (err) {
                        console.log(err);
                        console.log("Unsuccessfully Updated Total");
                        result = "Unsuccessfull";
                        error = err;
                    } else {
                        console.log("Successfully Updated Total");
                        result = "Successfull";
                    }
                }
            );
        }
        var ret = {
            result: result,
            error: error
        }
        res.status(200).json(ret);
    },
    validateUser: async (req, res, next) => {
        console.log('We are currently in the Validate API');
        const {
            email,
            code
        } = req.body;
            await userModel.findOneAndUpdate({
                    "Email": email
                }, {
                    "$set": {
                        "Validated": 1,
                    }
                },
                function (err) {
                    if (err) {
                        console.log(err);
                        console.log("Unsuccessfully Validaded");
                        result = "Unsuccessfull";
                        error = err;
                    } else {
                        console.log("Successfully Validaded");
                        result = "Successfull";
                    }
                }
            );
        var ret = {
            result: result,
            error: error
        }
        return res.status(200).json(ret);
    }
    // Do Delete
}