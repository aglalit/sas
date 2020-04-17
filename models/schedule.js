var mongoose = require('mongoose');

// define the schema for our user model
var scheduleSchema = mongoose.Schema({
  schedule: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Schedule', scheduleSchema);
