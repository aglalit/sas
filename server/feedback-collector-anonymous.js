module.exports = function (app, Session, transporter, officeTransporter, logger) {
  app.get('/polls/ba-2019-year1-module1-english', function (req, res) {
    res.render('ba-2019-year1-module1-english');
  });

  app.get('/polls/generic-anonymous', function (req, res) {
    res.render('generic-anonymous');
  });

  app.post('/polls/feedback-collector-anonymous', function (req, res) {
    var newSession = new Session();
    parseSession(newSession, req);

    req.flash('info', 'The form is submitted. Thanks for the feedback ( ͡° ͜ʖ ͡°)');
    res.render('polls_anonymous', {
      messages: req.flash('info')
    });

    function parseSession (sess, req) {
      var now = new Date();
      sess.session_id = req.session.id;
      //   var keyNames = Object.keys(req.body);
      //   keyNames.forEach((el)=>{
      //     console.log(req.body[el]);
      //
      //       sess.polls.ba_2018_year2_the_city_as_text[el] = req.body[el];
      // });
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
      sess.polls[req.body.subject.replace(/-/g, '_')] = JSON.stringify(req.body);
      sess.save(function (err) {
        if (err) { logger.error(err); }
        return console.error(err);
      });
    }
  });
};
