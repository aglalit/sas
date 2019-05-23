module.exports = function(app, Session, transporter, isLoggedIn, UserAnonymous){

app.get('/polls/ba-2019-year2-module8-gb', function(req, res) {
  res.render('ba-2019-year2-module8-gb', {user: req.user})
});

app.post('/polls/ba-2019-year2-module8-gb', function(req, res) {
  UserAnonymous.findOne({
    '_id': req.user._id
  }, function(err, user) {
    if (err)
      return done(err);

    if (user) {
      parseSession (user, req, transporter);

      user.save(function(err, user) {
        if (err)
          return console.error(err);
        }
      );
    } else {
      console.log('There isn\'t such user in the database');
    }
  });
  req.flash('info', `Your choice is submitted (ELECTIVE 1: 1st priority — ${req.body["elective1"]}; 2nd priority — ${req.body["elective2"]}; 3rd priority — ${req.body["elective3"]}; 4th priority — ${req.body["elective4"]}; ELECTIVE 2: 1st priority — ${req.body["elective5"]}; 2nd priority — ${req.body["elective6"]}; 3rd priority — ${req.body["elective7"]}; 4th priority — ${req.body["elective8"]};). In case of mistake, you can make your choice again. Thanks for participation ( ͡° ͜ʖ ͡°)`);
  function parseSession (sess, req, transporter){
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
    for (let i=0;i<bodyKeys.length;i++){
      emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
      sess.polls.ba_2019_year2_module8_gb[bodyKeys[i]] = req.body[bodyKeys[i]];
    }
    let mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'm.agliulin@utmn.ru', // list of receivers
      subject: 'GB Literature — feedback', // Subject line
      // text: JSON.stringify(req.user), // plain text body
      html: emailBody.toString() // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
    sess.save(function(err) {
      if (err)
        return console.error(err);
      return;
    });
  }
});
}
