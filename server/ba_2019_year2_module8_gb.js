module.exports = function(app, Session, transporter, isLoggedIn, UserAnonymous){

app.get('/polls/ba-2019-year2-module8-gb', isLoggedIn, function(req, res) {
  res.render('ba-2019-year2-module8-gb', {user: req.user})
});

app.post('/polls/ba-2019-year2-module8-gb', function(req, res) {
  UserAnonymous.findOne({
    '_id': req.user._id
  }, function(err, user) {
    if (err)
      return done(err);

    if (user) {
      let now = new Date();
      let name;
      let email;
    //   var keyNames = Object.keys(req.body);
    //   keyNames.forEach((el)=>{
    //     console.log(req.body[el]);
    //
    //       sess.polls.ba_2018_year2_the_city_as_text[el] = req.body[el];
    // });
      request('https://oauth2.googleapis.com/tokeninfo?id_token='+user.google.token, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body.name);
      }
      });

      let emailBody = '';
      let bodyKeys = Object.keys(req.body);
      console.log(user);
      console.log(user.polls);

      for (let i=0;i<bodyKeys.length;i++){
        emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
        // user.polls.ba_2019_year2_module8_gb[bodyKeys[i]] = req.body[bodyKeys[i]];
      }
      user.polls.ba_2019_year2_module8_gb = JSON.stringify(req.body);
      let mailOptions = {
        from: '"SAS" <sas@utmn.ru>', // sender address
        to: 'm.agliulin@utmn.ru', // list of receivers
        subject: 'GB Literature — feedback', // Subject line
        // text: JSON.stringify(req.user), // plain text body
        html: emailBody.toString() // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
      user.save(function(err) {
        if (err)
          return console.error(err);
        return;
      });

      // user.save(function(err, user) {
      //   if (err)
      //     return console.error(err);
      //   }
      // );
    } else {
      console.log('There isn\'t such user in the database');
    }
  });
  req.flash('info', `${JSON.stringify(req.body)}. In case of mistake, you can make your choice again. Thanks for participation ( ͡° ͜ʖ ͡°)`);

});
}
