module.exports = function(app, Session, officeTransporter, isLoggedIn, User){

  app.get('/polls/candidates', isLoggedIn, function(req, res) {
    res.render('candidates', {user: req.user})
  });

  app.get('/polls/candidates2', isLoggedIn, function(req, res) {
    res.render('candidates2', {user: req.user})
  });

  app.post('/polls/candidates', function(req, res) {
    User.findOne({
      '_id': req.user._id
    }, function(err, user) {
      if (err)
        return done(err);

      if (user) {
        user.polls.candidates.data = JSON.stringify(req.body);
        var now = new Date();
        user.polls.candidates.time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});

        user.save(function(err, user) {
          if (err)
            return console.error(err);
          }
        );
      } else {
        console.log('There isn\'t such user in the database');
      }
    });
    req.flash('info', `Ваш ответ принят. Благодарим за участие.`);
    let emailBody = '';
    var bodyKeys = Object.keys(req.body);
    for (let i=0;i<bodyKeys.length;i++){
      emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
    }
    let mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'm.agliulin@utmn.ru, f.gook@utmn.ru', // list of receivers
      subject: 'Candidates',  // Subject line
      // text: JSON.stringify(req.user), // plain text body
      html: JSON.stringify(req.user.google.name) + ', ' + JSON.stringify(req.user.google.email) + ': ' + emailBody.toString() // html body
    };
    officeTransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.render('polls_anonymous', {
      user: req.user,
      messages: req.flash('info')
    });
  });
};
