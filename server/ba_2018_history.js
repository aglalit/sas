module.exports = function(app, Session, transporter, isLoggedIn, User){

  app.get('/polls/ba-2018-history', isLoggedIn, function(req, res) {
    res.render('ba-2018-history', {user: req.user})
  });

  app.post('/polls/ba-2018-history', function(req, res) {
    User.findOne({
      '_id': req.user._id
    }, function(err, user) {
      if (err)
        return done(err);

      if (user) {
        user.polls.ELECTIVES["ba_2018_history"].track = req.body["track"];

        var now = new Date();
        user.polls.ELECTIVES["ba_2018_history"].time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});

        user.save(function(err, user) {
          if (err)
            return console.error(err);
          }
        );
      } else {
        console.log('There isn\'t such user in the database');
      }
    });
    req.flash('info', `Your choice is submitted (${req.body["track"]}). In case of mistake, you can make your choice again. Thanks for participation.`);
    let mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'marat.goya@gmail.com, e.samokhvalova@utmn.ru', // list of receivers
      subject: 'История — новый результат опроса', // Subject line
      // text: JSON.stringify(req.user), // plain text body
      html: '<b>' + JSON.stringify(req.user.google.email) + '<br/><br/>' + JSON.stringify(req.body) + '</b>' // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.render('polls', {
      user: req.user,
      messages: req.flash('info')
    });
  });
};
