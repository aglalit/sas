function pollModelAI(req) {
  User.findOne({
    '_id': req.user._id
  }, function(err, user) {
    if (err)
      return done(err);

    if (user) {
      user.polls.AI.question1 = req.body.question1;
      user.save(function(err, user) {
        if (err)
          return console.error(err);
        console.log(user);
      });
      user.polls.AI.question1 = req.body.question1;
    } else {
      console.log('There isn\'t such user in the database');
    }
  });
}

module.exports = pollModelAI(req);
