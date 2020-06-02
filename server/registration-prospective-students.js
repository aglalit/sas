module.exports = function(app, Session, transporter) {

app.get('/polls/registration-prospective-students', function(req, res) {
  res.render('registration-prospective-students')
});

app.post('/polls/registration-prospective-students', function(req, res) {
Session.findOne({
  'session_id': req.session.id
}, function(err, session) {
  if (err)
    return done(err);

    var newSession = new Session();
    parseSession (newSession, req, transporter);

});

  req.flash('info', 'Благодарим за регистрацию.');
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
    to: 'm.agliulin@utmn.ru,s.makhmudova@utmn.ru', // list of receivers
    subject: 'SAS — запись на онлайн-консультацию', // Subject line
    // text: JSON.stringify(req.user), // plain text body
    html: emailBody.toString() // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  sess.polls.registration_prospective_students.data = JSON.stringify(req.body);
  sess.polls.registration_prospective_students.time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});
  sess.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
}
}
