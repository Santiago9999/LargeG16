

const express = require ('express'); 
const router = express.Router(); 
const User = require('../models/users').default; 

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
})

module.exports = router; 
