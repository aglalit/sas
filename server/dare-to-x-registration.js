module.exports = function (app, Session, transporter) {
  app.get('/polls/dare-to-x-registration-students', function (req, res) {
    res.render('dare-to-x-registration-students', { user: req.user });
  });

  app.get('/polls/dare-to-x-registration-experts', function (req, res) {
    res.render('dare-to-x-registration-experts');
  });

  app.post('/polls/dare-to-x-registration', function (req, res) {
    Session.findOne({
      session_id: req.session.id
    }, function (err, session) {
      if (err) { return done(err); }

      var newSession = new Session();
      parseSession(newSession, req, transporter);
    });

    req.flash('info', 'Благодарим за регистрацию.');
    res.render('polls_anonymous', { messages: req.flash('info') });
  });

  function parseSession (sess, req, transporter) {
    sess.session_id = req.session.id;

    let emailBody = '';
    var bodyKeys = Object.keys(req.body);
    for (let i = 0; i < bodyKeys.length; i++) {
      emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
    }
    const mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'm.agliulin@utmn.ru, a.rusakova@utmn.ru', // list of receivers
      subject: 'SAS — registration', // Subject line
      html: emailBody.toString()
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
    sess.polls.dare_to_x_registration = JSON.stringify(req.body);
    sess.save(function (err) {
      if (err) { return console.error(err); }
    });
  }
};
