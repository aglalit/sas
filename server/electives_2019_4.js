module.exports = function(app, Session, transporter, isLoggedIn, User){

  app.get('/polls/electives-2019-4-year2-2', isLoggedIn, function(req, res) {
    res.render('electives-2019-4-year2-2', {user: req.user})
  });

  app.get('/polls/electives-2019-4-year2-1', isLoggedIn, function(req, res) {
    res.render('electives-2019-4-year2-1', {user: req.user})
  });

  app.get('/polls/electives-2019-4-year1', isLoggedIn, function(req, res) {
    res.render('electives-2019-4-year1', {user: req.user})
  });

  app.get('/polls/electives-2019-4-year3-biology', isLoggedIn, function(req, res) {
    res.render('electives-2019-4-year3-biology', {user: req.user})
  });

  app.get('/polls/electives-2019-4-year3-history', isLoggedIn, function(req, res) {
    res.render('electives-2019-4-year3-history', {user: req.user})
  });

  app.get('/polls/electives-2019-4-year3-art', isLoggedIn, function(req, res) {
    res.render('electives-2019-4-year3-art', {user: req.user})
  });

  app.get('/polls/electives-2019-4-year3-media', isLoggedIn, function(req, res) {
    res.render('electives-2019-4-year3-media', {user: req.user})
  });

  app.get('/polls/electives-2019-4-year3-sociology', isLoggedIn, function(req, res) {
    res.render('electives-2019-4-year3-sociology', {user: req.user})
  });

  app.get('/polls/electives-2019-4-year3-it', isLoggedIn, function(req, res) {
    res.render('electives-2019-4-year3-it', {user: req.user})
  });

  app.get('/polls/electives-2019-4-economics', isLoggedIn, function(req, res) {
    res.render('electives-2019-4-economics', {user: req.user})
  });

  app.get('/polls/electives-2019-4-foreign', isLoggedIn, function(req, res) {
    res.render('electives-2019-4-foreign', {user: req.user})
  });

  app.post('/polls/electives-2019-4', function(req, res) {
    User.findOne({
      '_id': req.user._id
    }, function(err, user) {
      if (err)
        return done(err);

      if (user) {
        user.polls.ELECTIVES["2019_4"].elective1 = req.body["elective1"];
        user.polls.ELECTIVES["2019_4"].elective2 = req.body["elective2"];
        user.polls.ELECTIVES["2019_4"].elective3 = req.body["elective3"];
        user.polls.ELECTIVES["2019_4"].elective4 = req.body["elective4"];
        user.polls.ELECTIVES["2019_4"].elective5 = req.body["elective5"];
        user.polls.ELECTIVES["2019_4"].elective6 = req.body["elective6"];
        user.polls.ELECTIVES["2019_4"].elective7 = req.body["elective7"];
        user.polls.ELECTIVES["2019_4"].elective8 = req.body["elective8"];
        user.polls.ELECTIVES["2019_4"].elective9 = req.body["elective9"];
        user.polls.ELECTIVES["2019_4"].elective10 = req.body["elective10"];

        var now = new Date();
        user.polls.ELECTIVES["2019_4"].time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});
        user.polls.ELECTIVES["2019_4"].major = req.body["major"];

        user.save(function(err, user) {
          if (err)
            return console.error(err);
          }
        );
      } else {
        console.log('There isn\'t such user in the database');
      }
    });
    if (req.body["major"] == 'year1' || req.body["major"] == 'year2-1' || req.body["major"] == 'bio' || req.body["major"] == 'soc' || req.body["major"] == 'media'){
          req.flash('info', `Your choice is submitted (ELECTIVE 1: 1st priority — ${req.body["elective1"]}; 2nd priority — ${req.body["elective2"]}; 3rd priority — ${req.body["elective3"]}; 4th priority — ${req.body["elective4"]}; 5th priority — ${req.body["elective5"]};). In case of mistake, you can make your choice again. Thanks for participation.`);
    }
    else {
          req.flash('info', `Your choice is submitted (ELECTIVE 1: 1st priority — ${req.body["elective1"]}; 2nd priority — ${req.body["elective2"]}; 3rd priority — ${req.body["elective3"]}; 4th priority — ${req.body["elective4"]}; 5th priority — ${req.body["elective5"]}; ELECTIVE 2: 1st priority — ${req.body["elective6"]}; 2nd priority — ${req.body["elective7"]}; 3rd priority — ${req.body["elective8"]}; 4th priority — ${req.body["elective9"]}; 10th priority — ${req.body["elective10"]};). In case of mistake, you can make your choice again. Thanks for participation.`);
    }
    //
    let emailBody = '';
    var bodyKeys = Object.keys(req.body);
    for (let i=0;i<bodyKeys.length;i++){
      emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
    }
    let mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'm.agliulin@utmn.ru, a.bunkova@utmn.ru', // list of receivers
      subject: 'The choice of electives' , // Subject line
      // text:  // plain text body
      html: '<p>' + JSON.stringify(req.user.google.name) + ', ' + JSON.stringify(req.user.google.email) + '</p>' + emailBody.toString() // html body
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
