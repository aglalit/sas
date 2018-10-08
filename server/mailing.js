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
  req.flash('info', 'Ваш запрос принят');
  //res.render('mailing', {messages: req.flash('info')})

  let addresses = req.body.addresses.split(' ');
  let names = req.body.names.split(' ');
  let grades = req.body.grades.split(' ');
  let letter_template = req.body.letter_template;
  for (let i=0;i<addresses.length;i++){
    let letter = letter_template.replace('{{{1}}}', names[i]).replace('{{{2}}}', grades[i]);
    console.log(letter);
    console.log(addresses[i]);
    console.log(req.body.letter_topic);

    let mailOptions = {
      from: '"SAS" <a.bunkova@utmn.ru>', // sender address
      to: addresses[i], // list of receivers
      subject: req.body.letter_topic, // Subject line
      // text: JSON.stringify(req.user), // plain text body
      html: '<p>' + letter + '</p>' // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }

});
}
