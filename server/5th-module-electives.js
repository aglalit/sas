module.exports = function(app, Session, transporter, isLoggedIn){

  app.get('/polls/5th-module-electives', isLoggedIn, function(req, res) {
    res.render('5th-module-electives', {user: req.user})
  });

  app.post('/polls/5th-module-electives', function(req, res) {
    User.findOne({
      '_id': req.user._id
    }, function(err, user) {
      if (err)
        return done(err);

      if (user) {
        user.polls.ELECTIVES["5module__electives"].elective1 = req.body["elective1"];
        user.polls.ELECTIVES["5module__electives"].elective2 = req.body["elective2"];
        user.polls.ELECTIVES["5module__electives"].elective3 = req.body["elective3"];

        var now = new Date();
        user.polls.ELECTIVES["3module__electives"].time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});

        user.save(function(err, user) {
          if (err)
            return console.error(err);
          }
        );
      } else {
        console.log('There isn\'t such user in the database');
      }
    });
    req.flash('info', `Ваш результат принят (1-й приоритет — ${req.body["elective1"]}; 2-й приоритет — ${req.body["elective2"]}; 3-й приоритет — ${req.body["elective3"]}). Благодарим за участие.`);
    let mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'marat.goya@gmail.com, e.samokhvalova@utmn.ru, a.rusakova@utmn.ru', // list of receivers
      subject: 'Новый результат опроса по семинарам и лекциям Школы', // Subject line
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
