module.exports = function(app, Session, transporter, isLoggedIn, User){

  app.get('/polls/electives-2018-1-2nd-course', isLoggedIn, function(req, res) {
    res.render('electives-2018-1-2nd-course', {user: req.user})
  });

  app.post('/polls/electives-2018-1-2nd-course', function(req, res) {
    User.findOne({
      '_id': req.user._id
    }, function(err, user) {
      if (err)
        return done(err);

      if (user) {
        user.polls.ELECTIVES["2018_1_2nd_course"].elective1 = req.body["elective1"];
        user.polls.ELECTIVES["2018_1_2nd_course"].elective2 = req.body["elective2"];
        user.polls.ELECTIVES["2018_1_2nd_course"].elective3 = req.body["elective3"];
        user.polls.ELECTIVES["2018_1_2nd_course"].elective4 = req.body["elective4"];
        user.polls.ELECTIVES["2018_1_2nd_course"].elective5 = req.body["elective5"];
        user.polls.ELECTIVES["2018_1_2nd_course"].elective6 = req.body["elective6"];

        var now = new Date();
        user.polls.ELECTIVES["2018_1_2nd_course"].time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});

        user.save(function(err, user) {
          if (err)
            return console.error(err);
          }
        );
      } else {
        console.log('There isn\'t such user in the database');
      }
    });
    req.flash('info', `Your choice is submitted (ELECTIVE 1: 1st priority — ${req.body["elective1"]}; 2nd priority — ${req.body["elective2"]}; 3rd priority — ${req.body["elective3"]}; ELECTIVE 2: 1st priority — ${req.body["elective4"]}; 2nd priority — ${req.body["elective5"]}; 3rd priority — ${req.body["elective6"]};). In case of mistake, you can make your choice again. Thanks for participation.`);
    let mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'marat.goya@gmail.com, e.samokhvalova@utmn.ru', // list of receivers
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
