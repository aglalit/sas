module.exports = function (app, Session, transporter) {
  app.get('/polls/registration-prospective-students', function (req, res) {
    res.render('registration-prospective-students');
  });

  app.post('/polls/registration-prospective-students', function (req, res) {
    Session.findOne({
      session_id: req.session.id
    }, function (err, session) {
      if (err) { return done(err); }

      var newSession = new Session();
      parseSession(newSession, req, transporter);
    });

    req.flash('info', 'Благодарим за регистрацию.');
    res.render('polls_anonymous', { messages: req.flash('info') });
  });

  function parseSession (sess, req, transporter) {
    var now = new Date();
    sess.session_id = req.session.id;
    sess.polls.registration_prospective_students.data = JSON.stringify(req.body);
    sess.polls.registration_prospective_students.time = now.toLocaleString('en-US', { timeZone: 'Asia/Yekaterinburg' });
    sess.save(function (err) {
      if (err) { return console.error(err); }
    });

    let emailBody = '';
    var bodyKeys = Object.keys(req.body);
    for (let i = 0; i < bodyKeys.length; i++) {
      emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
    }
    let mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'm.agliulin@utmn.ru, olimpiada_sas@utmn.ru', // list of receivers
      subject: 'SAS — Интенсив “Выбор направления подготовки и профессиональная траектория”', // Subject line
      // text: JSON.stringify(req.user), // plain text body
      html: emailBody.toString() // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });

    let emailBody2 = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html>
     <head>
      <meta content="width=device-width, initial-scale=1" name="viewport">
      <meta charset="UTF-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="format-detection" content="telephone=no">
      <title>Регистрация I Интенсив Ты. Университет. Будущее</title>
      <!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]-->
      <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
      <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
     </head>
     <body>
      <div class="es-wrapper-color">
       <!--[if gte mso 9]>
    			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
    				<v:fill type="tile" color="null"></v:fill>
    			</v:background>
    		<![endif]-->
       <table width="100%" class="es-wrapper" cellspacing="0" cellpadding="0">
         <tr>
          <td class="st-br" valign="top">
           <table align="center" class="es-content" cellspacing="0" cellpadding="0">
             <tr>
              <td align="center" style="background-color: #ffffff" bgcolor="#ffffff">
               <table align="center" class="es-content-body" style="background-color:#ffffff;width:600px" bgcolor="#ffffff" cellspacing="0" cellpadding="0">
                 <tr>
                  <td align="left" style="background-color: #ffffff" bgcolor="#ffffff">
                   <table cellspacing="0" cellpadding="0" width="100%">
                     <tr>
                      <td align="left" style="width:600px">
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                         <tr>
                          <td align="left"><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px"><span style="font-size:16px"><strong><span style="font-size:15px">Дорогой(-ая) ${req.body["Name"]}<br><br>Спасибо за регистрацию!</span>&nbsp;</strong></span><br><br>Мы очень рады, что тебя заинтересовал интенсив для 11-классников<br><a target="_blank" href="https://sas.utmn.ru/ru/prospective-students-intensive-program-2021/" style="color: #fe0c05;font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px">«Ты. Университет. Будущее».<br><br></a>Чтобы участвовать в заочном отборе, тебе <strong>нужно в ответном письме прислать заявку.</strong><a target="_blank" href="https://sas.utmn.ru/ru/prospective-students-intensive-program-2021/" style="color: #fe0c05;font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px"></a><br></p></td>
                         </tr>
                         <tr>
                          <td align="center" style="font-size: 0px"><img class="adapt-img" src="https://ijfwyo.stripocdn.email/content/guids/CABINET_7a8bfd4b5eaf917634e115d1a7f44bdd/images/20251604663321671.jpg" alt style="display: block" width="600"></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="center" style="background-color: #ffffff" bgcolor="#ffffff">
               <table align="center" class="es-content-body" style="background-color:#ffffff;width:600px" bgcolor="#ffffff" cellspacing="0" cellpadding="0">
                 <tr>
                  <td align="left" style="border-radius: 0px 0px 10px 10px;background-color: #ffffff">
                   <table width="100%" cellspacing="0" cellpadding="0">
                     <tr>
                      <td align="center" valign="top" style="width:540px">
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                         <tr>
                          <td align="left" class="es-m-txt-c"><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">Заявка состоит из:<br><br>1. <b style="color: #ff0000">твоё краткое CV&nbsp;</b>(от лат. Curriculum vitæ, в переводе — «ход жизни» или жизнеописание)</p><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">Не забудь в нём указать:</p>
                           <ul>
                            <li style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">ФИО на русском</li>
                            <li style="line-height: 100%"><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">и ФИ на английском языке</p></li>
                            <li style="line-height: 100%"><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">дату рождения</p></li>
                            <li style="line-height: 100%"><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">номер класса и школы</p></li>
                            <li style="line-height: 100%"><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">город</p></li>
                            <li style="line-height: 100%"><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">твои достижения и интересы</p></li>
                            <li style="line-height: 100%"><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">и т.д.</p></li>
                           </ul><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">Файл должен быть в формате PDF. А название файла: твои «Фамилия_Имя»</p><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">2. <strong><span style="color: #ff0000">90-секундный видеоролик на английском языке&nbsp;</span></strong>на одну из тем, выбранную из списка:</p><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px"><b>Темы для видео-заявок</b></p>
                           <ol>
                            <li style="line-height: 100%"><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">Какую из всех прочитанных тобой <b>книг </b>ты мог бы назвать “<b>Великой</b>”? Подробно объясни почему.</p></li>
                            <li style="line-height: 100%"><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">Представь свой родной <b>город как текст</b>. О чём этот текст? Какой он? Расскажи нам!</p></li>
                            <li style="line-height: 100%"><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">Какой вопрос (или вопросы), стоящий перед <b>современной наукой</b>, ты считаешь самым важным и актуальным? Почему?</p></li>
                            <li style="line-height: 100%"><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">Какое из известных тебе <b>произведений искусства</b> вызывает у тебя самые противоречивые чувства и мысли? Объясни подробно, почему так происходит?</p></li>
                            <li style="line-height: 100%"><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">Какой <b>исторический период</b> тебя интригует? Если у тебя появится шанс путешествий во времени, куда ты отправишься? Подробно расскажи почему</p></li>
                            <li style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px"><b>Искусственный интеллект</b> —&nbsp; это настоящий интеллект или нет? Обоснуй свою точку зрения.</li>
                           </ol><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">Твоё видео должно быть только <strong>на английском языке </strong>— совсем без использования русского. Ведь заявку будут оценивать <a target="_blank" style="color: #f6140e;font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px" href="https://sas.utmn.ru/ru/people/">наши иностранные профессора</a>, а они не знают русский язык.</p><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">Файл должен быть в формате MP4 или AVI, для того чтобы мы точно смогли его посмотреть. В письме не забудь указать номер и название выбранной темы.</p><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px">Мы подготовили для тебя <a target="_blank" style="color: #f6140e;font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px" href="https://sas.utmn.ru/ru/prospective-students-intensive-program-2021#tips">7 советов, о том как сделать видео-заявку</a>. Обязательно прочитай их!</p><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px;line-height: 14px"><b style="color: #ff0000">Deadline:&nbsp;</b><b>заявки принимаются строго до 23:59 10 января 2021 (мск)</b>.</p></td>
                         </tr>
                         <tr>
                          <td align="center" style="font-size: 0px"><img class="adapt-img" src="https://ijfwyo.stripocdn.email/content/guids/CABINET_7a8bfd4b5eaf917634e115d1a7f44bdd/images/67681604661260849.gif" alt style="display: block" width="370"></td>
                         </tr>
                         <tr>
                          <td align="left"><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px">Результаты отбора придут на твою почту до 26 января. Если ты станешь победителем отборочного этапа, мы пригласим<span style="color:#FF0000">*</span> тебя провести три увлекательных дня (это будут праздничные выходные) в одном из самых комфортных университетских пространств России. <strong>Проживание и питание в дни интенсива для участников бесплатное.</strong></p><p style="text-align: left;color: #ff0000;font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 12px"><em>*Билеты в Тюмень и обратно домой придётся приобрести за свой счёт.</em></p><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px">Ты сделаешь полезную передышку в подготовке к ЕГЭ и поймешь, что значит учиться в университете.</p><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px">А если станешь лучшим и на мероприятиях интенсива «Ты. Университет. Будущее», то <span style="color:#FF0000"><b>получишь шанс поступить на бесплатное место в <a target="_blank" style="color: #f10f09" href="https://sas.utmn.ru/ru/ba-program/">самый международный бакалавриат России</a> уже в марте!</b></span>&nbsp;</p><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px">Нам уже не терпится с тобой познакомиться! Если остались вопросы, обязательно пиши их.</p><p style="font-family: arial, 'helvetica neue', helvetica, sans-serif;font-size: 14px"><br>Команда SAS</p></td>
                         </tr>
                         <tr>
                          <td align="left"><p style="font-size: 13px;font-family: tahoma, verdana, segoe, sans-serif"><b style="font-size: 14px;font-family: arial, 'helvetica neue', helvetica, sans-serif">P.S. Подписывайся на наши социальные сети!</b><span style="display: none" data-cke-bookmark="1">&nbsp;</span></p></td>
                         </tr>
                       </table></td>
                     </tr>
                     <tr>
                      <td align="center" valign="top" style="width:540px">
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                         <tr>
                          <td align="center" style="font-size:0">
                           <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" role="presentation">
                             <tr>
                              <td align="center" valign="top"><a href="https://www.facebook.com/sas.utmn.ru/" target="_blank"><img width="32" title="Facebook" alt="Fb" src="https://ijfwyo.stripocdn.email/content/assets/img/social-icons/logo-colored/facebook-logo-colored.png"></a></td>
                              <td align="center" valign="top"><a href="https://twitter.com/sas_utmn/" target="_blank"><img width="32" title="Twitter" alt="Tw" src="https://ijfwyo.stripocdn.email/content/assets/img/social-icons/logo-colored/twitter-logo-colored.png"></a></td>
                              <td align="center" valign="top"><a href="https://www.instagram.com/sas_utmn/" target="_blank"><img width="32" title="Instagram" alt="Inst" src="https://ijfwyo.stripocdn.email/content/assets/img/social-icons/logo-colored/instagram-logo-colored.png"></a></td>
                              <td align="center" valign="top"><a href="https://www.youtube.com/channel/UCTOl5FTiDD-n61Xiu0e_Uvg" target="_blank"><img width="32" title="Youtube" alt="Yt" src="https://ijfwyo.stripocdn.email/content/assets/img/social-icons/logo-colored/youtube-logo-colored.png"></a></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
      </div>
     </body>
    </html>`;

    const mailOptions2 = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: req.body["Email"], // list of receivers
      subject: 'Регистрация | Интенсив «Ты. Университет. Будущее»', // Subject line
      // text: JSON.stringify(req.user), // plain text body
      html: emailBody2.toString() // html body
    };
    transporter.sendMail(mailOptions2, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
};
