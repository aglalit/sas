module.exports = function(app, Session, transporter){

app.get('/polls/ma-2018-apostolov', function(req, res) {
  res.render('ma-2018-apostolov', {user: req.user})
});

app.post('/polls/ma-2018-apostolov', function(req, res) {
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
  req.flash('info', 'Ваш результат принят. Благодарим за участие.');
  res.render('polls_anonymous', {messages: req.flash('info')})
});

function parseSession (sess, req, transporter){
  var now = new Date();
  sess.session_id = req.session.id;
  sess.polls.ma_2018_apostolov.time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});
  var keyNames = Object.keys(req.body);
  keyNames.forEach((el)=>{
    console.log(req.body[el]);

      sess.polls.ma_2018_apostolov[el] = req.body[el];
});
  sess.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
  let emailBody = '';
  var bodyKeys = Object.keys(req.body);
  for (let i=0;i<bodyKeys.length;i++){
    emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
  }
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'marat.goya@gmail.com, e.samokhvalova@utmn.ru, a.rusakova@utmn.ru', // list of receivers
    subject: 'Новый результат опроса по семинарам и лекциям Школы', // Subject line
    // text: JSON.stringify(req.user), // plain text body
    html: emailBody.toString() // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
}
