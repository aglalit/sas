module.exports = function(app, Session, transporter, isLoggedIn, User, logger) {

  let name;
  let email;

  app.get('/polls/ba-2019-year2-module8-design-thinking', isLoggedIn, function(req, res) {
    res.render('ba-2019-year2-module8-design-thinking', {
      user: req.user
    })
  });

  app.post('/polls/ba-2019-year2-module8-design-thinking', function(req, res) {
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
    });
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
    req.flash('info', 'Ответ принят. Благодарим за обратную связь ( ͡° ͜ʖ ͡°)');
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
        subject: 'Design thinking', // Subject line
        // text: JSON.stringify(req.user), // plain text body
        html: emailBody.toString() // html body
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
      mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'm.agliulin@utmn.ru', // list of receivers
        subject: `${name}: ${email}`, // Subject line
        // text: JSON.stringify(req.user), // plain text body
        html:  'Design thinking'
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
      sess.polls.ba_2019_year2_module8_design_thinking = JSON.stringify(req.body);
      sess.save(function(err) {
        if (err)
          logger.error(err);
          return console.error(err);
        return;
      });
    }
  });
}
