var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  polls: {
    AI_Metaphor: {
      LECTURES:{
        "Как хорошо были организованы материалы курса" : Number
      },
      SEMINARS:{

      }
    }
  }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.poll = function(req){
  userSchema.findOne({
    '_id': req.user._id
  }, function(err, user) {
    if (err)
      return done(err);

    if (user) {
      user.polls.AI_Metaphor.LECTURES["Как хорошо были организованы материалы курса"] = req.body["Как хорошо были организованы материалы курса"];
console.log(req.body);
      user.save(function(err, user) {
        if (err)
          return console.error(err);
        console.log(user);
      });
    } else {
      console.log('There isn\'t such user in the database');
    }
  });
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
