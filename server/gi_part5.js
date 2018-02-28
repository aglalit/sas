module.exports = function(app, Session, transporter){

app.get('/polls/global-issues-part-5', function(req, res) {
  res.render('global-issues-part-5', {user: req.user})
});

app.post('/polls/global-issues-part-5', function(req, res) {
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
  sess.polls.GI_part5.time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});
  sess.polls.GI_part5.LECTURES["Оцените сложность содержания лекций"] = req.body["Оцените сложность содержания лекций"];
  sess.polls.GI_part5.LECTURES["Насколько новым для вас было содержание лекций"] = req.body["Насколько новым для вас было содержание лекций"];
  sess.polls.GI_part5.LECTURES["Насколько изменились ваше мышление, знания и умения под воздействием лекций"] = req.body["Насколько изменились ваше мышление, знания и умения под воздействием лекций"];
  sess.polls.GI_part5.LECTURES["Что вам больше всего понравилось на лекциях?"] = req.body["Что вам больше всего понравилось на лекциях?"];
  sess.polls.GI_part5.LECTURES["Что вам больше всего не понравилось на лекциях?"] = req.body["Что вам больше всего не понравилось на лекциях?"];
  sess.polls.GI_part5.LECTURES["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"] = req.body["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"];

  sess.polls.GI_part5.SEMINARS["Что именно для вас было непонятным и самым сложным в установке на групповую работу?"] = req.body["Что именно для вас было непонятным и самым сложным в установке на групповую работу?"];
  sess.polls.GI_part5.SEMINARS["Оцените, насколько понятной для вас была установка на групповую работу"] = req.body["Оцените, насколько понятной для вас была установка на групповую работу"];
  sess.polls.GI_part5.SEMINARS["Укажите имя и фамилию куратора, организовывавшего групповую работу"] = req.body["Укажите имя и фамилию куратора, организовывавшего групповую работу"];
  sess.polls.GI_part5.SEMINARS["Оцените, помог ли дополнительный такт (предзащита) в продвижении работы вашей группы?"] = req.body["Оцените, помог ли дополнительный такт (предзащита) в продвижении работы вашей группы?"];
  sess.polls.GI_part5.SEMINARS["Оцените эффективность формата самостоятельной групповой работы (без куратора)"] = req.body["Оцените эффективность формата самостоятельной групповой работы (без куратора)"];
  sess.polls.GI_part5.SEMINARS["Что для вас было самым интересным в групповой работе?"] = req.body["Что для вас было самым интересным в групповой работе?"];
  sess.polls.GI_part5.SEMINARS["Что для вас было самым интересным на пленаре?"] = req.body["Что для вас было самым интересным на пленаре?"];
  sess.polls.GI_part5.SEMINARS["Как бы вы порекомендовали улучшить этот курс"] = req.body["Как бы вы порекомендовали улучшить этот курс"];

  sess.save(function(err) {
    if (err)
      return console.error(err);
    return;
  });
  let mailOptions = {
    from: '"SAS" <sas@utmn.ru>', // sender address
    to: 'marat.goya@gmail.com, e.samokhvalova@utmn.ru, a.rusakova@utmn.ru', // list of receivers
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
};
