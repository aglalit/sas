module.exports = function(app, Session, transporter){

app.get('/polls/faculty-trips', function(req, res) {
  res.render('faculty-trips', {user: req.user})
});

app.post('/polls/faculty-trips', function(req, res) {
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
//   var keyNames = Object.keys(req.body);
//   keyNames.forEach((el)=>{
//     console.log(req.body[el]);
//
//       sess.polls.ba_2018_year1_the_city_as_text[el] = req.body[el];
// });
  let emailBody = '';
  console.log(req.body);
  for (let i=0;i<req.body.length;i++){
    var bodyKeys = Object.keys(req.body);
    console.log(Object.keys(req.body)[i]);
    console.log(req.body[i]);
    emailBody += '<p>' + bodyKeys[i] + ': ' + req.body[i] + '</p>';
  }
  console.log(emailBody);
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'marat.goya@gmail.com,v.savina@utmn.ru', // list of receivers
    subject: 'SAS — Information on my trip for holidays / weekends', // Subject line
    // text: JSON.stringify(req.user), // plain text body
    html: emailBody.toString(); // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  sess.polls.faculty_trips = JSON.stringify(req.body);
  sess.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
}
}
