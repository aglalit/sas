module.exports = function(app, Session, transporter){

app.get('/polls/ba-2019-year2-module7-gb', function(req, res) {
  res.render('ba-2019-year2-module7-gb', {user: req.user})
});

app.post('/polls/ba-2019-year2-module7-gb', function(req, res) {
  Session.findOne({
    'session_id': req.session.id
  }, function(err, session) {
    if (err)
      return done(err);

    if (session) {
      parseSession (session, req, transporter);
    } else {
      var newSession = new Session();
      parseSession (newSession, req, transporter);
    }
  });
  req.flash('info', 'Ответ принят. Благодарим за обратную связь ( ͡° ͜ʖ ͡°)');
  res.render('polls_anonymous', {messages: req.flash('info')})
});

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
  }
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'marat.goya@gmail.com,s.makhmudova@utmn.ru', // list of receivers
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
  sess.polls.ba_2019_year2_module7_gb = JSON.stringify(req.body);
  sess.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
}
}
