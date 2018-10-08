module.exports = function(app, Session, transporter){

app.get('/office/mailing', function(req, res) {
  res.render('mailing', {user: req.user})
});

app.post('/office/mailing', function(req, res) {
  // Session.findOne({
  //   'session_id': req.session.id
  // }, function(err, session) {
  //   if (err)
  //     return done(err);
  //
  //   if (session) {
  //     parseSession (session, req, transporter);
  //   } else {
  //     var newSession = new Session();
  //     parseSession (newSession, req, transporter);
  //   }
  // });
  req.flash('info', 'Ваш результат принят. Благодарим за участие.');
  res.render('mailing', {messages: req.flash('info')})
});

function parseSession (sess, req, transporter){
  var now = new Date();
  
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'marat.goya@gmail.com, e.samokhvalova@utmn.ru', // list of receivers
    subject: 'Новый результат опроса по семинарам и лекциям Школы', // Subject line
    // text: JSON.stringify(req.user), // plain text body
    html: '<b>' + JSON.stringify(req.session.id) + '<br/><br/>' + JSON.stringify(req.body) + '</b>' // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
}