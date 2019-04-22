module.exports = function(app, Session, transporter){

//code snippet 3
var fileUpload = require("express-fileupload");

app.use(fileUpload());

app.get('/polls/faculty-research-trips', function(req, res) {
  res.render('faculty-research-trips', {user: req.user})
});


app.post('/polls/faculty-research-trips', function(req, res) {
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
  req.flash('info', 'Thank you! Your application was successfully submitted.');
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
  var file = req.files["Invitation"];
  var file2 = req.files["Absract"];
  var bodyKeys = Object.keys(req.body);

  for (let i=0;i<bodyKeys.length;i++){
    emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
  }
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'marat.goya@gmail.com,v.savina@utmn.ru', // list of receivers
    subject: 'SAS — research trips', // Subject line
    // text: JSON.stringify(req.user), // plain text body
    html: emailBody.toString(),
    attachments:
    [
      {
        filename: file.name,
        content: file.data
      },
      {
        filename: file2.name,
        content: file2.data
      },
    ]
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
  sess.polls.faculty_research_trips = JSON.stringify(req.body);
  sess.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
}
}
