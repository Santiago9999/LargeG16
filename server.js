//server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const util = require('./utilities/util')
//----------------------------------------------------------------------------------------------------------
const router = require('./routes/index');

const {
  response,
  request
} = require('express');
const {
  schema
} = require('./models/users');

const app = express();
//const PORT = 3002;
app.set('port', (process.env.PORT || 3002));

const MONGODB_URI = "mongodb+srv://Wildsoul:Katara@cluster0-xs7yp.mongodb.net/CS2EZ?retryWrites=true&w=majority";

// app.use(cors())
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use('/api', router);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
var db = mongoose.connection;

mongoose.connection.once('open', function () {
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function (error) {
  console.log('Mongoose Connection Error : ' + error);
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get('/', function (request, response) {
  response.send('Hello World!')
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`);
});
