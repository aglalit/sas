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
  res.render('mailing', {messages: req.flash('info')})

  let addresses = req.body.addresses.split('\n');
  let names = req.body.names.split('\n');
  let grades = req.body.grades.split('\n');
  let letter_template = req.body.letter_template;
  let allMails = '';
  for (let i=0;i<addresses.length;i++){
    let letter = letter_template.replace('{{{1}}}', names[i]).replace('{{{2}}}', grades[i]);
    allMails += addresses[i] + '\n' + letter + '\n';
    let mailOptions = {
      from: '"SAS" <a.bunkova@utmn.ru>', // sender address
      to: addresses[i], // list of receivers
      subject: 'Вами отправлены следующие письма:', // Subject line
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
  let mailOptions = {
    from: '"SAS" <a.bunkova@utmn.ru>', // sender address
    to: 'a.bunkova@utmn.ru', // list of receivers
    subject: req.body.letter_topic, // Subject line
    // text: JSON.stringify(req.user), // plain text body
    html: '<p>' + allMails + '</p>' // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });

});
}
