module.exports = function(app, Session, transporter, logger){

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
  var promises = [];
  for (let i=0;i<addresses.length;i++){

    allMails += addresses[i] + ' ' + names[i] + '<br/>' + letter + '<br/>';

    promises.push(new Promise(function(resolve, reject) {
    let letter = letter_template.replace('{{{1}}}', names[i]).replace('{{{2}}}', grades[i]);

    let mailOptions = {
      from: '"SAS" <a.bunkova@utmn.ru>', // sender address
      to: addresses[i], // list of receivers
      cc: 'a.bunkova@utmn.ru',
      subject: req.body.letter_topic, // Subject line
      // text: JSON.stringify(req.user), // plain text body
      html: '<p>' + letter + '</p>', // html body
      dsn: {
        id: 'some random message specific id',
        return: 'headers',
        notify: ['success','failure', 'delay'],
        recipient: 'a.bunkova@utmn.ru, m.agliulin@utmn.ru'
    }
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
    }));
  }

  Promise.all(promises).then(function(info) { logger.info(info); }, function(error) { logger.error(error); });

  let mailOptions = {
    from: '"SAS" <a.bunkova@utmn.ru>', // sender address
    to: 'a.bunkova@utmn.ru', // list of receivers
    cc: 'a.bunkova@utmn.ru',
    subject: 'Вами отправлены следующие письма:', // Subject line
    // text: JSON.stringify(req.user), // plain text body
    html: '<p>' + allMails + '</p>', // html body
    dsn: {
      id: 'some random message specific id',
      return: 'headers',
      notify: ['failure', 'delay'],
      recipient: 'a.bunkova@utmn.ru, m.agliulin@utmn.ru'
  }
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });

});
}
