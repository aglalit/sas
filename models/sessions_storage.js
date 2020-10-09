var mongoose = require('mongoose');

// define the schema for our user model
var sessionSchema = mongoose.Schema({

  session_id: String,
});

// create the model for users and expose it to our app
module.exports = mongoose.model('SessionsStorage', sessionSchema);
