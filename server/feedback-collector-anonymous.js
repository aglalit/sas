module.exports = function (app, Session, transporter, officeTransporter, logger) {

  app.get('/polls/generic-anonymous', function (req, res) {
    res.render('generic-anonymous');
  });

  app.get('/polls/generic-anonymous-2', function (req, res) {
    res.render('generic-anonymous-2');
  });

  app.get('/polls/generic-anonymous-3', function (req, res) {
    res.render('generic-anonymous-3');
  });

  app.get('/polls/generic-anonymous-4', function (req, res) {
    res.render('generic-anonymous-4');
  });

  app.post('/polls/feedback-collector-anonymous', function (req, res) {
    var newSession = new Session();
    parseSession(newSession, req);

    req.flash('info', 'Ваша форма отправлена.');
    res.render('polls_anonymous', {
      messages: req.flash('info')
    });

    function parseSession (sess, req) {
      var now = new Date();
      sess.session_id = req.session.id;

      console.log(req.body);
      let emailBody = '';
      var bodyKeys = Object.keys(req.body);
      for (let i = 0; i < bodyKeys.length; i++) {
        emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
      }
      const mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'm.agliulin@utmn.ru', // list of receivers
        subject: 'Feedback', // Subject line
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
        if (info) {
          logger.info(mailOptions.html);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
      sess.polls.generic_anonymous.data = JSON.stringify(req.body);
      sess.polls.generic_anonymous.time = now.toLocaleString('en-US', {
        timeZone: 'Asia/Yekaterinburg'
      });
      sess.save(function (err) {
        if (err) { logger.error(err); }
        return console.error(err);
      });
    }
  });

  app.post('/polls/feedback-collector-anonymous-second', function (req, res) {
    var newSession = new Session();
    parseSession(newSession, req);

    req.flash('info', 'Ваша форма отправлена.');
    res.render('polls_anonymous', {
      messages: req.flash('info')
    });

    function parseSession (sess, req) {
      var now = new Date();
      sess.session_id = req.session.id;

      console.log(req.body);
      let emailBody = '';
      var bodyKeys = Object.keys(req.body);
      for (let i = 0; i < bodyKeys.length; i++) {
        emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
      }
      const mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'm.agliulin@utmn.ru', // list of receivers
        subject: 'Feedback', // Subject line
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
        if (info) {
          logger.info(mailOptions.html);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
      sess.polls.generic_anonymous_second.data = JSON.stringify(req.body);
      sess.polls.generic_anonymous_second.time = now.toLocaleString('en-US', {
        timeZone: 'Asia/Yekaterinburg'
      });
      sess.save(function (err) {
        if (err) { logger.error(err); }
        return console.error(err);
      });
    }
  });
};
