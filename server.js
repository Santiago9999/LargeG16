//server.js
const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors');
// ../models/users.model not js(possible fix)

// Mongoose addtition
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
//const mongoClient = require('mongodb').MongoClient;
//----------------------------------------------------------------------------------------------------------
// Schemas (making them external after)
const ScoresSchema = new Schema({ 
	Intro: { type: Number,  default: 0},
	CS1: { type: Number,  default: 0}, 
	CS2: { type: Number,  default: 0}
});

const UsersSchema = new Schema({ 
	ID: Number,
	FirstName: { type: String },
	LastName: { type: String }, 
	Email: { type: String },
	Password: { type: String },
	Scores: [ScoresSchema]
});
//----------------------------------------------------------------------------------------------------------

const router = require('./routes/index');
const { response, request } = require('express');

const app = express(); 
const PORT = 3001; 
const MONGODB_URI = "mongodb+srv://Wildsoul:Katara@cluster0-xs7yp.mongodb.net/CS2EZ?retryWrites=true&w=majority"; 

// app.use(cors())
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/api', router); 

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}); 
var db = mongoose.connection;

mongoose.connection.once('open', function() { 
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
}); 
//----------------------------------------------------------------------------------------------------------
// Initializing Models
const userModel = mongoose.model("user", UsersSchema);

//----------------------------------------------------------------------------------------------------------
app.post('/api/login', async (req, res, next) => 
{
  console.log('We are currently in the login API');
  console.log(req.body);
  //response.send(req.body);
  const { email, password } = req.body;
  // var loginDetails = 
  // {
  //   email : request.body.email,
  //   password :request.body.password
  // }
  console.log('Data Recieved Email: ' + email + ' Password: ' + password)
  var id = -1;
  var firstName = '';
  var lastName = '';
  var error = '';

  const credentials = await userModel.find({Email: email, Password:password}, function(err)
    {
      if (err)
      {
        console.log(err);
        error = err;
      }
    });
  // No errors on using the find function
  console.log(credentials);
  
  if (credentials.length > 0)
  {
    id = credentials[0].ID;
    console.log('ID: ' + id);
  
    firstName = credentials[0].FirstName;
    console.log('First Name: ' + firstName);
  
    lastName = credentials[0].LastName;
    console.log('Last Name: ' + lastName);
    error = 'Sucess';
  }
  else
  {
    console.log('No records found');
    error = 'No Records found';
  }
  
  var ret =
  {
    ID : id, 
    firstName : firstName,
    lastName : lastName,
    error : error 
  }


  // Everything is Good, we are sending back a JSON Package
  res.status(200).json(ret);
  });





// Add API end points here that call external functions 
app.get('/', function(request, response) { response.send('Hello World!') });

app.listen(PORT, function() { 
  console.log(`Server listening on port ${PORT}.`);
});
