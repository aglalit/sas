module.exports = function(app, Session, transporter){

app.get('/polls/poetry', function(req, res) {
  res.render('poetry')
});

app.post('/polls/poetry', function(req, res) {
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

  req.flash('info', 'Thanks for your vote. In case of mistake, you can vote again ');
  res.render('poetry', {messages: req.flash('info')})
});

app.get('/polls/poetry_data', function(req, res) {
  Session.find({'polls.poetry': {$exists : true}}).select('polls.poetry -_id').exec(function (err, docs){
    if (err) {
      res.send(err);
      logger.error(err);
    }
    res.render('poetry_data', {
      data: docs
    });
  });

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
    subject: 'SAS — Poetry', // Subject line
    // text: JSON.stringify(req.user), // plain text body
    html: emailBody.toString() // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  sess.polls.poetry.answer = (req.body.answer == "TRUE");
  sess.polls.poetry.comments = req.body.comments;
  sess.polls.poetry.time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});
  sess.polls.poetry.ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  sess.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
}
}
