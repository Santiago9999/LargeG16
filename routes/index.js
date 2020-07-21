

const express = require ('express'); 
const router = express.Router(); 
const User = require('../models/users').default; 
const UserInfo = require('./loginAndRegister');
const updateUserData = require('./updateUserData');
const getHighScores = require('./getScores');
const updateQuestions = require('./questions');

router.get('/Users', function(req, res) { 
  User.find(function(err, Users) {
    res.json(Users);
  });
});

router.get('/Users/:id', function(req, res) {  
  User.findById(req.params.id, function(err, User) {
    if (!User) {
      res.status(404).send('No result found');
    } else {
      res.json(User);
    }
  });
});

router.post('/Users', function(req, res) {     
  let User = new User(req.body);
  User.save()
    .then(User => {
      res.send(User);
    })
    .catch(function(err) {
      res.status(422).send('User add failed');
    });
});

router.patch('/Users/:id', function(req, res){    
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(function() {
      res.json('User updated');
    })
    .catch(function(err) {
      res.status(422).send("User update failed.");
    });
});

router.delete('/Users/:id', function(req, res) {  
  User.findById(req.params.id, function(err, User) {
    if (!User) {
      res.status(404).send('User not found');
    } else {
      User.findByIdAndRemove(req.params.id)
        .then(function() { res.status(200).json("User deleted") })
        .catch(function(err) {
          res.status(400).send("User delete failed.");
        })
    }
  });
});


router.route('/getLogin').post(UserInfo.login);
router.route('/postregister').post(UserInfo.register);
router.route('/UpdateIntro').post(updateUserData.postUpdateIntro);
router.route('/UpdateCS1').post(updateUserData.postUpdateCS1);
router.route('/UpdateCS2').post(updateUserData.postUpdateCS2);
router.route('/getIntroHighScores').post(getHighScores.getIntroHighScores);
router.route('/getCS1HighScores').post(getHighScores.getCS1HighScores);
router.route('/getCS2HighScores').post(getHighScores.getCS2HighScores);
router.route('/getTotalHighScores').post(getHighScores.getTotalHighScores);
router.route('/addQuestion').post(updateQuestions.postQuestions);
router.route('/getQuestion').post(updateQuestions.getQuestions);
router.route('/postChangePassword').post(UserInfo.changePassword);
router.route('/postForgotPassword').post(UserInfo.forgotPassword);
router.route('/postvalidateUser').post(UserInfo.validateUser);


module.exports = router; 
