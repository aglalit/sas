module.exports = function (app, Session, transporter, officeTransporter, isLoggedIn, User, logger) {
  var name;
  var email;

  // app.get('/polls/:path', isLoggedIn, function (req, res) {
  //   console.log(req.params, req.params.path);
  //   res.render(req.params.path, {
  //     user: req.user
  //   });
  // });

  // app.get('/polls/generic',
  // isLoggedIn,
  // function(req, res) {
  //   res.render('generic', {
  //     user: req.user
  //   })
  // });
  //
  // app.get('/polls/generic2',
  // isLoggedIn,
  // function(req, res) {
  //   res.render('generic2', {
  //     user: req.user
  //   })
  // });

  app.post('/polls/generic', function (req, res) {
    if (req.user) {
      User.findOne({
        _id: req.user._id
      }, function (err, user) {
        if (err) {
          req.flash('error', 'There is an error, please try again');
          return done(err);
        }

        if (user) {
          user.polls.generic = JSON.stringify(req.body);

          user.save(function (err, user) {
            if (err) { return console.error(err); }
          }
          );
        } else {
          console.log('There isn\'t such user in the database');
        }
      });
      req.flash('info', 'Your choice is submitted. In case of mistake, you can make your choice again. Thanks for participation.');
      //
      let emailBody = '';
      var bodyKeys = Object.keys(req.body);
      for (let i = 0; i < bodyKeys.length; i++) {
        emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
      }
      const mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'm.agliulin@utmn.ru', // list of receivers
        subject: 'The choice of electives', // Subject line
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
    } else {
      console.log('req.user doesnt exist');
      req.flash('error', 'An error occurred, please try again');
      res.render('login', {
        messages: req.flash('error')
      });
    }
  });

  app.post('/polls/generic2', function (req, res) {
    if (req.user) {
      User.findOne({
        _id: req.user._id
      }, function (err, user) {
        if (err) {
          req.flash('error', 'There is an error, please try again');
          return done(err);
        }

        if (user) {
          user.polls.generic2 = JSON.stringify(req.body);

          user.save(function (err, user) {
            if (err) { return console.error(err); }
          }
          );
        } else {
          console.log('There isn\'t such user in the database');
        }
      });
      req.flash('info', 'Your choice is submitted. In case of mistake, you can make your choice again. Thanks for participation.');
      //
      let emailBody = '';
      var bodyKeys = Object.keys(req.body);
      for (let i = 0; i < bodyKeys.length; i++) {
        emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
      }
      const mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'm.agliulin@utmn.ru', // list of receivers
        subject: 'The choice of electives', // Subject line
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
    } else {
      console.log('req.user doesnt exist');
      req.flash('error', 'An error occurred, please try again');
      res.render('login', {
        messages: req.flash('error')
      });
    }
  });

  app.post('/polls/feedback-collector', function (req, res) {
    if (req.user) {
      User.findOne({
        _id: req.user._id
      }, function (err, user) {
        if (err) { logger.error(err); }
        console.log(err);

        if (user) {
          name = user.google.name;
          email = user.google.email;
          user.polls.FEEDBACK[req.body.subject] = true;

          user.save(function (err, user) {
            if (err) { return console.error(err); }
          }
          );
        } else {
          console.log('There isn\'t such user in the database');
        }

        Session.findOne({
          session_id: req.session.id
        }, function (err, session) {
          if (err) { logger.error(err); }
          console.log(err);

          if (session) {
            parseSession(session, req, transporter);
          } else {
            var newSession = new Session();
            parseSession(newSession, req, transporter);
          }
        });
      });
    } else {
      Session.findOne({
        session_id: req.session.id
      }, function (err, session) {
        if (err) { logger.error(err); }
        console.log(err);

        if (session) {
          parseSession(session, req, transporter);
        } else {
          var newSession = new Session();
          parseSession(newSession, req, transporter);
        }
      });
    }

    req.flash('info', 'The form is submitted. Thanks for the feedback ( ͡° ͜ʖ ͡°)');
    res.render('polls', {
      user: req.user,
      messages: req.flash('info')
    });

    function parseSession (sess, req, transporter) {
      var now = new Date();
      sess.session_id = req.session.id;
      //   var keyNames = Object.keys(req.body);
      //   keyNames.forEach((el)=>{
      //     console.log(req.body[el]);
      //
      //       sess.polls.ba_2018_year2_the_city_as_text[el] = req.body[el];
      // });
      let emailBody = '';
      var bodyKeys = Object.keys(req.body);
      for (let i = 0; i < bodyKeys.length; i++) {
        emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
      }
      sess.polls[req.body.subject.replace(/-/g, '_')] = JSON.stringify(req.body);
      sess.save(function (err) {
        if (err) { logger.error(err); }
        return console.error(err);
        return;
      });
      let mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'm.agliulin@utmn.ru', // list of receivers
        subject: 'Feedback', // Subject line
        // text: JSON.stringify(req.user), // plain text body
        html: emailBody.toString() // html body
      };
      officeTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error(error);
          logger.error(mailOptions.subject);
          logger.error(mailOptions.html);
          return console.log(error);
        }
        if (info) {
          logger.info(mailOptions.html);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
      mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        // to: 'walerieorlova@gmail.com', // list of receivers
        to: 'marat.goya@gmail.com', // list of receivers
        subject: `${name}: ${email}`, // Subject line
        // text: JSON.stringify(req.user), // plain text body
        html: req.body.subject.replace(/-/g, '_')
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error(error);
          logger.error(mailOptions.subject);
          logger.error(mailOptions.html);
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
    }
  });
};
