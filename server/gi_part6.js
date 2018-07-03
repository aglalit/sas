module.exports = function(app, Session, transporter){

app.get('/polls/global-issues-part-6', function(req, res) {
  res.render('global-issues-part-6', {user: req.user})
});

app.post('/polls/global-issues-part-6', function(req, res) {
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
  sess.polls.GI_part6.time = now.toLocaleString('en-US', {timeZone: 'Asia/Yekaterinburg'});
  sess.polls.GI_part6.LECTURES["Оцените сложность содержания лекций"] = req.body["Оцените сложность содержания лекций"];
  sess.polls.GI_part6.LECTURES["Насколько новым для вас было содержание лекций"] = req.body["Насколько новым для вас было содержание лекций"];
  sess.polls.GI_part6.LECTURES["Насколько изменились ваше мышление, знания и умения под воздействием лекций"] = req.body["Насколько изменились ваше мышление, знания и умения под воздействием лекций"];
  sess.polls.GI_part6.LECTURES["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"] = req.body["Сколько процентов обязательных текстов по этой части курса вы успевали прочесть"];
  sess.polls.GI_part6.LECTURES["Как методические материалы для разбора выступлений проектных групп (таблица с «чекбоксами» и комментариями) помогли вам"] = req.body["Как методические материалы для разбора выступлений проектных групп (таблица с «чекбоксами» и комментариями) помогли вам"];
  sess.polls.GI_part6.LECTURES["Выступление какой группы было для вас самым интересным?"] = req.body["Выступление какой группы было для вас самым интересным?"];

  sess.polls.GI_part6.SEMINARS["Что именно для вас было непонятным и самым сложным в установке на групповую работу?"] = req.body["Что именно для вас было непонятным и самым сложным в установке на групповую работу?"];
  sess.polls.GI_part6.SEMINARS["Оцените, насколько понятной для вас была установка на групповую работу"] = req.body["Оцените, насколько понятной для вас была установка на групповую работу"];
  sess.polls.GI_part6.SEMINARS["Укажите имя и фамилию куратора, организовывавшего групповую работу"] = req.body["Укажите имя и фамилию куратора, организовывавшего групповую работу"];
  sess.polls.GI_part6.SEMINARS["Оцените насколько семинарские занятия помогли вам разобраться с содержанием темы этого модуля"] = req.body["Оцените насколько семинарские занятия помогли вам разобраться с содержанием темы этого модуля"];
  sess.polls.GI_part6.SEMINARS["Оцените эффективность формата самостоятельной групповой работы (без куратора)"] = req.body["Оцените эффективность формата самостоятельной групповой работы (без куратора)"];
  sess.polls.GI_part6.SEMINARS["Что для вас было самым интересным в групповой работе?"] = req.body["Что для вас было самым интересным в групповой работе?"];
  sess.polls.GI_part6.SEMINARS["Что для вас было самым интересным на пленаре?"] = req.body["Что для вас было самым интересным на пленаре?"];
  sess.polls.GI_part6.SEMINARS["Как бы вы порекомендовали улучшить этот курс"] = req.body["Как бы вы порекомендовали улучшить этот курс"];

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
