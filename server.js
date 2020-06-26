//server.js
const express = require('express'); 
const mongoose = require('mongoose');
// const cors = require('cors');
const router = require('./routes/index');

const app = express(); 
const PORT = 3001; 
const MONGODB_URI = "mongodb+srv://Wildsoul:Katara@cluster0-xs7yp.mongodb.net/CS2EZ?retryWrites=true&w=majority"; 

// app.use(cors())
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/api', router); 

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true,}); 
var db = mongoose.connection;

// for (var i in mongoose.connection.collections) 
// {
//   console.log(mongoose.connection.collections[i]);
//   // will drop collection hereclear
// }

//Testing
// db.getCollection('Users').insert(
//   {
//   'ID': '1',
//   'FirstName': 'Juan',
//   'LastName': 'Herrera', 
//   'Email': 'Juan@Herrera.com',
//   'Password': '123'
//   }
// )

mongoose.connection.once('open', function() { 
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
}); 

app.get('/', function(request, response) { response.send('Hello World!') });

app.listen(PORT, function() { 
  console.log(`Server listening on port ${PORT}.`);
});
