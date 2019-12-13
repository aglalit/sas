module.exports = function(app, Session, transporter, isLoggedIn, User){

  app.get('/polls/electives_2020_1', isLoggedIn, function(req, res) {
    res.render('electives_2020_1', {user: req.user})
  });

  app.post('/polls/electives_2020_1', function(req, res) {
    if (req.user){
      User.findOne({
        '_id': req.user._id
      }, function(err, user) {
        if (err) {
          req.flash('error', `There is an error, please try again`);
          return done(err);
        }

        if (user) {
          user.polls.ELECTIVES["2020_1"].elective1 = req.body["1"];
          user.polls.ELECTIVES["2020_1"].elective2 = req.body["2"];
          user.polls.ELECTIVES["2020_1"].elective3 = req.body["3"];
          user.polls.ELECTIVES["2020_1"].elective4 = req.body["4"];
          user.polls.ELECTIVES["2020_1"].elective5 = req.body["5"];
          user.polls.ELECTIVES["2020_1"].elective6 = req.body["6"];
          user.polls.ELECTIVES["2020_1"].elective7 = req.body["7"];
          user.polls.ELECTIVES["2020_1"].elective8 = req.body["8"];
          user.polls.ELECTIVES["2020_1"].elective9 = req.body["9"];
          user.polls.ELECTIVES["2020_1"].elective10 = req.body["10"];
          user.polls.ELECTIVES["2020_1"].elective11 = req.body["11"];
          user.polls.ELECTIVES["2020_1"].elective12 = req.body["12"];
          user.polls.ELECTIVES["2020_1"].elective13 = req.body["13"];
          user.polls.ELECTIVES["2020_1"].elective14 = req.body["14"];

          var now = new Date();
          user.polls.ELECTIVES["2020_1"].time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});

          user.save(function(err, user) {
            if (err)
              return console.error(err);
            }
          );
        } else {
          console.log('There isn\'t such user in the database');
        }
      });
      req.flash('info', `Your choice is submitted (1: ${req.body["1"]}; 2: ${req.body["2"]}; 3: ${req.body["3"]}; 4: ${req.body["4"]}; 5: ${req.body["5"]}; 6: ${req.body["6"]}; 7: ${req.body["7"]}; 8: ${req.body["8"]}; 9: ${req.body["9"]}; 10: ${req.body["10"]}; 11: ${req.body["11"]}; 12: ${req.body["12"]}; 13: ${req.body["13"]}; 14: ${req.body["14"]};). In case of mistake, you can make your choice again. Thanks for participation.`);
      //
      let emailBody = '';
      var bodyKeys = Object.keys(req.body);
      for (let i=0;i<bodyKeys.length;i++){
        emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
      }
      let mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'm.agliulin@utmn.ru', // list of receivers
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
    }
    else {
      console.log('req.user doesnt exist');
      req.flash('error', `An error occurred, please try again`)
      res.render('login', {
        messages: req.flash('error')
      });
    }
  });
};
