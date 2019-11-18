module.exports = function(app, Session, transporter, isLoggedIn, User){

  app.get('/polls/gi_topics_2020', isLoggedIn, function(req, res) {
    res.render('gi_topics_2020', {user: req.user})
  });

  app.post('/polls/gi_topics_2020', function(req, res) {
    User.findOne({
      '_id': req.user._id
    }, function(err, user) {
      if (err)
        return done(err);

      if (user) {
        user.polls.gi_topics_2020.1 = req.body["1"];
        user.polls.gi_topics_2020.2 = req.body["2"];
        user.polls.gi_topics_2020.3 = req.body["3"];
        user.polls.gi_topics_2020.4 = req.body["4"];
        user.polls.gi_topics_2020.5 = req.body["5"];
        user.polls.gi_topics_2020.6 = req.body["6"];
        user.polls.gi_topics_2020.7 = req.body["7"];
        user.polls.gi_topics_2020.8 = req.body["8"];
        user.polls.gi_topics_2020.9 = req.body["9"];
        user.polls.gi_topics_2020.10 = req.body["10"];
        var now = new Date();
        user.polls.gi_topics_2020.time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});

        user.save(function(err, user) {
          if (err)
            return console.error(err);
          }
        );
      } else {
        console.log('There isn\'t such user in the database');
      }
    });
    req.flash('info', `Your choice is submitted. In case of mistake, you can make your choice again. Thanks for participation ( ͡° ͜ʖ ͡°)`);
    let emailBody = '';
    var bodyKeys = Object.keys(req.body);
    for (let i=0;i<bodyKeys.length;i++){
      emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
    }
    let mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'm.agliulin@utmn.ru, // list of receivers
      subject: 'gi_topics_2020',  // Subject line
      // text: JSON.stringify(req.user), // plain text body
      html: JSON.stringify(req.user.google.name) + ', ' + JSON.stringify(req.user.google.email) + ': ' + emailBody.toString() // html body
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
