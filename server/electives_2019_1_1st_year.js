module.exports = function(app, Session, transporter, isLoggedIn, User){

  app.get('/polls/electives-2019-1-1st-year', isLoggedIn, function(req, res) {
    res.render('electives-2019-1-1st-year', {user: req.user})
  });

  app.post('/polls/electives-2019-1-1st-year', function(req, res) {
    User.findOne({
      '_id': req.user._id
    }, function(err, user) {
      if (err)
        return done(err);

      if (user) {
        user.polls.ELECTIVES["2019_1_1st_year"].elective1 = req.body["elective1"];
        user.polls.ELECTIVES["2019_1_1st_year"].elective2 = req.body["elective2"];
        user.polls.ELECTIVES["2019_1_1st_year"].elective3 = req.body["elective3"];
        user.polls.ELECTIVES["2019_1_1st_year"].elective4 = req.body["elective4"];

        var now = new Date();
        user.polls.ELECTIVES["2019_1_1st_year"].time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});

        user.save(function(err, user) {
          if (err)
            return console.error(err);
          }
        );
      } else {
        console.log('There isn\'t such user in the database');
      }
    });
    req.flash('info', `Your choice is submitted (1st priority — ${req.body["elective1"]}; 2nd priority — ${req.body["elective2"]}; 3rd priority — ${req.body["elective3"]}; 4th priority — ${req.body["elective4"]};). In case of mistake, you can make your choice again. Thanks for participation.`);
    let emailBody = '';
    var bodyKeys = Object.keys(req.body);
    for (let i=0;i<bodyKeys.length;i++){
      emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
    }
    let mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'm.agliulin@utmn.ru, apply_sas@utmn.ru', // list of receivers
      subject: 'Элективы:' + JSON.stringify(req.user.google.name) + ', ' + JSON.stringify(req.user.google.email), // Subject line
      // text: JSON.stringify(req.user), // plain text body
      html: emailBody.toString() // html body
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
