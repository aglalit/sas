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
      LECTURES: {
        question1: {
          label: "Как хорошо были организованы материалы курса (ридер, раздатки, книги, электронные копии книг, аудиовизуальные материалы, e-mail рассылки, соцсети, web-сайт и т.д.).Оцените по шкале от 0 до 10, где 0 – материалов вообще не было или ими было невозможно пользоваться; 5 – материалов явно не хватало или пользоваться ими было затруднительно; 10 – материалов было совершенно достаточно, они были легко доступны и прекрасно структурированы.
 ",
        value: Number
      },
      question2: {
        label: "Как хорошо были организованы материалы курса (ридер, раздатки, книги, электронные копии книг, аудиовизуальные материалы, e-mail рассылки, соцсети, web-сайт и т.д.).Оцените по шкале от 0 до 10, где 0 – материалов вообще не было или ими было невозможно пользоваться; 5 – материалов явно не хватало или пользоваться ими было затруднительно; 10 – материалов было совершенно достаточно, они были легко доступны и прекрасно структурированы.",
      value: Number
      }
      }
      SEMINARS: {}
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

userSchema.methods.poll = function(req) {
  User.findOne({
    '_id': req.user._id
  }, function(err, user) {
    if (err)
      return done(err);

    if (user) {
      user.polls.AI_Metaphor.LECTURES.question1 = req.body.question1;
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
