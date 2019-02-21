module.exports = function(app, Session, transporter, isLoggedIn, User){

  app.get('/polls/pds-2019-classes', isLoggedIn, function(req, res) {
    res.render('pds-2019-classes', {user: req.user})
  });

  app.post('/polls/pds-2019-classes', function(req, res) {
    User.findOne({
      '_id': req.user._id
    }, function(err, user) {
      if (err)
        return done(err);

      if (user) {
        user.polls.ELECTIVES["pds_2019_classes"]["9:40"] = req.body["9:40"];
        user.polls.ELECTIVES["pds_2019_classes"]["11:30"] = req.body["11:30"];
        user.polls.ELECTIVES["pds_2019_classes"]["14:00"] = req.body["14:00"];
        user.polls.ELECTIVES["pds_2019_classes"]["15:40"] = req.body["15:40"];

        var now = new Date();
        user.polls.ELECTIVES["pds_2019_classes"].time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});

        user.save(function(err, user) {
          if (err)
            return console.error(err);
          }
        );
      } else {
        console.log('There isn\'t such user in the database');
      }
    });
    function undef(time){
      return time == undefined ? 'none' : time;
    }
    req.flash('info', `Your choice is submitted (9:40 — ${undef(req.body["9:40"])}; 11:30 — ${undef(req.body["11:30"])}; 14:00 — ${undef(req.body["14:00"])}; 15:40 — ${undef(req.body["15:40"])};). In case of mistake, you can make your choice again. Thanks for participation.`);
    let emailBody = '';
    var bodyKeys = Object.keys(req.body);
    for (let i=0;i<bodyKeys.length;i++){
      emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
    }
    let mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'marat.goya@gmail.com, e.samokhvalova@utmn.ru', // list of receivers
      subject: 'PDS classes', // Subject line
      // text: JSON.stringify(req.user), // plain text body
      html: JSON.stringify(req.user.google.name) + ', ' + JSON.stringify(req.user.google.email) + '<br/>' + emailBody.toString() // html body
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
