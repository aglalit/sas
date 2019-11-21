module.exports = function(app, Session, transporter, officeTransporter, isLoggedIn, User, logger) {

  var name;
  var email;

  app.get('/polls/ba-2019-year1-module1-wtai', isLoggedIn, function(req, res) {
    res.render('ba-2019-year1-module1-wtai', {
      user: req.user
    })
  });

  app.get('/polls/ba-2019-year1-module1-spb', isLoggedIn, function(req, res) {
    res.render('ba-2019-year1-module1-spb', {
      user: req.user
    })
  });

  app.get('/polls/ba-2019-year2-module5-poms-juliette', isLoggedIn, function(req, res) {
    res.render('ba-2019-year2-module5-poms-juliette', {
      user: req.user
    })
  });

  app.get('/polls/ba-2019-year2-module5-poms-krishna', isLoggedIn, function(req, res) {
    res.render('ba-2019-year2-module5-poms-krishna', {
      user: req.user
    })
  });

  app.get('/polls/ba-2019-year2-module5-poms-louis', isLoggedIn, function(req, res) {
    res.render('ba-2019-year2-module5-poms-louis', {
      user: req.user
    })
  });
  app.get('/polls/ba-2019-module1-elective1', isLoggedIn, function(req, res) {
    res.render('ba-2019-module1-elective1', {
      user: req.user
    })
  });
  app.get('/polls/ba-2019-module1-elective2', isLoggedIn, function(req, res) {
    res.render('ba-2019-module1-elective2', {
      user: req.user
    })
  });
  app.get('/polls/ba-2019-module1-elective3', isLoggedIn, function(req, res) {
    res.render('ba-2019-module1-elective3', {
      user: req.user
    })
  });
  app.get('/polls/ba-2019-module1-major1', isLoggedIn, function(req, res) {
    res.render('ba-2019-module1-major1', {
      user: req.user
    })
  });
  app.get('/polls/ba-2019-module1-major2', isLoggedIn, function(req, res) {
    res.render('ba-2019-module1-major2', {
      user: req.user
    })
  });
  app.get('/polls/ba-2019-year2-module5-art', isLoggedIn, function(req, res) {
    res.render('ba-2019-year2-module5-art', {
      user: req.user
    })
  });
  app.get('/polls/ba-2019-year2-module5-aw', isLoggedIn, function(req, res) {
    res.render('ba-2019-year2-module5-aw', {
      user: req.user
    })
  });
  // app.get('/polls/ba-2019-year1-module1-english', isLoggedIn, function(req, res) {
  //   res.render('ba-2019-year1-module1-english', {
  //     user: req.user
  //   })
  // });
  app.get('/polls/generic',
  isLoggedIn,
  function(req, res) {
    res.render('generic', {
      user: req.user
    })
  });


  app.post('/polls/feedback-collector', function(req, res) {
    User.findOne({
      '_id': req.user._id
    }, function(err, user) {
      if (err)
        logger.error(err);
        console.log(err);

      if (user) {
        name = user.google.name;
        email = user.google.email;
      } else {
        console.log('There isn\'t such user in the database');
      }

      Session.findOne({
        'session_id': req.session.id
      }, function(err, session) {
        if (err)
          logger.error(err);
          console.log(err);

        if (session) {
          parseSession(session, req, transporter);
        } else {
          var newSession = new Session();
          parseSession(newSession, req, transporter);
        }
      });

    });

    req.flash('info', 'The form is submitted. Thanks for the feedback ( ͡° ͜ʖ ͡°)');
    res.render('polls_anonymous', {
      messages: req.flash('info')
    })

    function parseSession(sess, req, transporter) {
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
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
      mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        // to: 'walerieorlova@gmail.com', // list of receivers
        to: 'marat.goya@gmail.com', // list of receivers
        subject: `${name}: ${email}`, // Subject line
        // text: JSON.stringify(req.user), // plain text body
        html:  req.body.subject.replace(/-/g, '_')
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
      sess.polls[req.body.subject.replace(/-/g, '_')] = JSON.stringify(req.body);
      sess.save(function(err) {
        if (err)
          logger.error(err);
          return console.error(err);
        return;
      });
    }
  });
}
