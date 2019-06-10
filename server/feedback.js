module.exports = function(app, Session, transporter, logger){

app.get('/feedback', function(req, res) {
  // Session.find({'polls': {$exists : true}}).select('polls').exec(function (err, docs){
  //   if (err) res.send(err)
  //   else {
  //
  //   }
  // });
  res.render('feedback', {
    // data: docs
  });
});

app.get('/feedback-ba-2019-year1-module4-gb', function(req, res) {
  Session.find({'polls.ba_2019_year1_module4_gb': {$exists : true}}).select('polls.ba_2019_year1_module4_gb').exec(function (err, docs){
    if (err) res.send(err)
    else {
      res.render('feedback-ba-2019-year1-module4-gb', {
        data: docs
      });
    }
  });

});


// app.post('/polls/registration-list', function(req, res) {
//   Session.findOne({
//     'session_id': req.session.id
//   }, function(err, session) {
//       return done(err);
//
//     if (session) {
//       parseSession (session, req, transporter);
//     } else {
//       var newSession = new Session();
//       parseSession (newSession, req, transporter);
//     }
//   });
//   req.flash('info', 'Благодарим за регистрацию.');
//   res.render('polls_anonymous', {messages: req.flash('info')})
// });

// function parseSession (sess, req, transporter){
//   var now = new Date();
//   sess.session_id = req.session.id;
// //   var keyNames = Object.keys(req.body);
// //   keyNames.forEach((el)=>{
// //     console.log(req.body[el]);
// //
// //       sess.polls.ba_2018_year1_the_city_as_text[el] = req.body[el];
// // });
//   let emailBody = '';
//   var bodyKeys = Object.keys(req.body);
//   for (let i=0;i<bodyKeys.length;i++){
//     emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
//   }
//   let mailOptions = {
//     from: '"SAS" <sas@utmn.ru>', // sender address
//     to: 'm.agliulin@utmn.ru', // list of receivers
//     subject: 'SAS — Registration', // Subject line
//     // text: JSON.stringify(req.user), // plain text body
//     html: emailBody.toString() // html body
//   };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
//   });
//   sess.polls.registration = JSON.stringify(req.body);
//   sess.save(function(err) {
//     if (err)
//       return console.error(err);
//     return;
//   });
// }
}
