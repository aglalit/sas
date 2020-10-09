module.exports = function(app, Session, transporter){

app.get('/polls/ba-2018-year2-module5-poms', function(req, res) {
  res.render('ba-2018-year2-module5-poms', {user: req.user})
});

app.post('/polls/ba-2018-year2-module5-poms', function(req, res) {
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

  sess.polls.ba_2018_year2_module5_poms = JSON.stringify(req.body);
  sess.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'm.agliulin@utmn.ru, s.makhmudova@utmn.ru', // list of receivers
    subject: 'SAS — новый результат опроса – POMS', // Subject line
    // text: JSON.stringify(req.user), // plain text body
    html: JSON.stringify(req.body) // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
}
