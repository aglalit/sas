module.exports = function(app, Session, transporter, isLoggedIn, User){

  app.get('/polls/majors', isLoggedIn, function(req, res) {
    res.render('majors', {user: req.user})
  });

  app.post('/polls/majors', function(req, res) {
    User.findOne({
      '_id': req.user._id
    }, function(err, user) {
      if (err)
        return done(err);

      if (user) {
        user.polls.majors.major = req.body["major"];

        var now = new Date();
        user.polls.majors.time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});

        user.save(function(err, user) {
          if (err)
            return console.error(err);
          }
        );
      } else {
        console.log('There isn\'t such user in the database');
      }
    });
    req.flash('info', `Your choice is submitted (${req.body["major"]}). In case of mistake, you can make your choice again. Thanks for participation ( ͡° ͜ʖ ͡°)`);
    let emailBody = '';
    var bodyKeys = Object.keys(req.body);
    for (let i=0;i<bodyKeys.length;i++){
      emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
    }
    let mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'm.agliulin@utmn.ru, s.makhmudova@utmn.ru', // list of receivers
      subject: 'Majors:' +  // Subject line
      // text: JSON.stringify(req.user), // plain text body
      html: JSON.stringify(req.user.google.name) + ', ' + JSON.stringify(req.user.google.email) + ': ' + emailBody.toString() // html body
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
