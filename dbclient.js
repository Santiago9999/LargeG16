const mongoose = require('mongoose');
//const users = require('../models/users');
var Schema = mongoose.Schema;
const MONGODB_URI = "mongodb+srv://Wildsoul:Katara@cluster0-xs7yp.mongodb.net/CS2EZ?retryWrites=true&w=majority";

const UsersSchema = new Schema({ 
	ID: Number,
	FirstName: String,
	LastName: String, 
	Email: String,
	Password: String,
	//Scores: [ScoresSchema]
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true,}); 
mongoose.connection.once('open', function() 
{
    var db = mongoose.connection;
    console.log('Connected to the Database.');
    const userSchema = mongoose.model("userss", UsersSchema);
    var userInstance = new userSchema({
            ID: 5, // Figure out how to auto increment
            FirstName: 'FredFlint', // Limitations such as if no name is present return err
            LastName: 'Bedrock',
            Email: 'Fred',
            Password: 'Flintstone',
    });
    userInstance.save().then(result => 
        {
          console.log(result);
          mongoose.disconnect();
        })
        .catch(err => 
        {
          error = err;
          console.log('Save() Exception: ', err);
          mongoose.disconnect();
        });
});



// const MAIN_DB = dbclient.db('CS2EZ');
// const USERS_COLLECTION = MAIN_DB.collection('users');
// console.log('Connected succesfully to database: ' + MAIN_DB.databaseName);

// MAIN_DB.stats((err, result) => {
//     console.log('DB STATS: ' + JSON.stringify(result, undefined,2));
// });
// var user = new UsersSchema({
//     ID: 5,
//     FirstName: 'FredFlint',
//     LastName: 'Bedrock',
//     Email: 'Fred',
//     Password: 'Flintstone',
// });

// user.save().then(result => {
//         console.log(result);
//         dbclient.close();
//     })
//     .catch(err => {
//         console.log('Save() Exception: ', err);
//         dbclient.close();
//     });

// USERS_COLLECTION.insertOne({"firstName" : "Jose"}, (err,result)=>
// {
//     if(err)
//     {
//         return console.log ("There was an error " + err );
//     }
//     console.log("Interted " + JSON.stringify(result.ops));
//     dbclient.close();
// })

// dbclient.close();