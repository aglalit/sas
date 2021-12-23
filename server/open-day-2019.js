module.exports = function(app, Session, transporter){

app.get('/polls/open-day-2019', function(req, res) {
  res.render('open-day-2019', {user: req.user})
});

app.post('/polls/open-day-2019', function(req, res) {
  Session.findOne({
    'session_id': req.session.id
  }, function(err, session) {
    if (err)
      return done(err);

      var newSession = new Session();
      parseSession (newSession, req, transporter);

  });
  req.flash('info', 'Ваша заявка принята. Благодарим за регистрацию.');
  res.render('polls_anonymous', {messages: req.flash('info')})
});

function parseSession (sess, req, transporter){
  var now = new Date();
  sess.session_id = req.session.id;
//   var keyNames = Object.keys(req.body);
//   keyNames.forEach((el)=>{
//     console.log(req.body[el]);
//
//       sess.polls.ba_2018_year1_the_city_as_text[el] = req.body[el];
// });
  let emailBody = '';
  var bodyKeys = Object.keys(req.body);
  for (let i=0;i<bodyKeys.length;i++){
    emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
  }
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'm.agliulin@utmn.ru', // list of receivers
    subject: 'SAS — Open Day 2019 Registration', // Subject line
    // text: JSON.stringify(req.user), // plain text body
    html: emailBody.toString() // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  sess.polls.open_day_2019 = JSON.stringify(req.body);
  sess.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
}
}
