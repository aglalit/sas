module.exports = function(app, Session, transporter, marketingTransporter) {
  app.get('/polls/registration-prospective-students', function(req, res) {
    res.render('registration-prospective-students');
  });

  app.post('/polls/registration-prospective-students', function(req, res) {
    Session.findOne({
      session_id: req.session.id
    }, function(err, session) {
      if (err) {
        return done(err);
      }

      var newSession = new Session();
      parseSession(newSession, req, transporter);
    });

    req.flash('info', 'Благодарим за регистрацию.');
    res.render('polls_anonymous', {
      messages: req.flash('info')
    });
  });

  function parseSession(sess, req, transporter) {
    var now = new Date();
    sess.session_id = req.session.id;
    sess.polls.registration_prospective_students.data = JSON.stringify(req.body);
    sess.polls.registration_prospective_students.time = now.toLocaleString('en-US', {
      timeZone: 'Asia/Yekaterinburg'
    });
    sess.save(function(err) {
      if (err) {
        return console.error(err);
      }
    });

    let emailBody = '';
    var bodyKeys = Object.keys(req.body);
    for (let i = 0; i < bodyKeys.length; i++) {
      emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
    }
    let mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'm.agliulin@utmn.ru, apply_sas@utmn.ru, olimpiada_sas@utmn.ru', // list of receivers
      subject: 'SAS — Интенсив 2022', // Subject line
      // text: JSON.stringify(req.user), // plain text body
      html: emailBody.toString() // html body
    };
    marketingTransporter.sendMail(mailOptions, (error, info) => {
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
      <title>Регистрация на интенсив Ты. Университет. Будущее</title>
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
       <table cellpadding="0" class="cf An" id="undefined"><tbody><tr><td class="Aq">&nbsp;</td><td class="Ap"><div id=":s3" class="Ar Au" style="display: block;"><div id=":rz" class="Am Al editable LW-avf tS-tW tS-tY" hidefocus="true" aria-label="Текст письма" g_editable="true" role="textbox" aria-multiline="true" contenteditable="true" tabindex="1" style="direction: ltr; min-height: 145px;" spellcheck="false"><span id="gmail-docs-internal-guid-9646488e-7fff-83de-9057-699f3749d18b"><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;" id="gmail-docs-internal-guid-17edcdd3-7fff-2a64-3bf5-dd97623531f6"><span id="gmail-docs-internal-guid-cec0683d-7fff-82aa-f638-fb3488bfab57"><span style="font-size: 11pt; font-family: Arial; font-variant-numeric: normal; font-variant-east-asian: normal; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 565px; height: 315px;"><img src="https://lh4.googleusercontent.com/u-zHd3Jeyt6kLBHZe4PCsCXMq5Vjx0Tla1x4Tx2P_YusWc07S0CmfnbSmPVzlXLgk-iOWjuncv4Dgu_jt6IWXBKP7Cljdb8mbMAwmevQDUNj3kGVwu-JIZBpOm0lA-TDYHeDF19E" width="496" height="277" style="margin-left: 0px; margin-top: 0px; margin-right: 25px;"></span></span></span><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="color: rgb(32, 33, 36); font-family: Roboto, sans-serif; font-size: 11pt; white-space: pre-wrap;">Дорогой(-ая) ${req.body["Name"]}<br></span><br></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Спасибо за регистрацию!&nbsp;</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Мы очень рады, что тебя заинтересовал Интенсив&nbsp; </span><span style="font-size: 10.5pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">для 11-классников </span><a href="https://sas2022.utmn.ru/" style="text-decoration: none;"><span style="font-size: 10.5pt; font-family: Arial; color: rgb(17, 85, 204); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: underline; text-decoration-skip-ink: none; vertical-align: baseline; white-space: pre-wrap;">«Ты. Университет. Будущее»</span></a><span style="font-size: 10.5pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">.</span><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"> Интенсив - это:</span></p><ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;"><li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre;"><p dir="ltr" style="line-height: 1.38; margin-top: 10pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Прекрасная возможность понять, что значит учиться в университете, и как не ошибиться при выборе направления подготовки</span></p></li><li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre;"><p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Шанс поступить на бесплатное место в </span><a href="https://sas.utmn.ru/ru/" style="text-decoration: none;"><span style="font-size: 11pt; font-family: Arial; color: rgb(17, 85, 204); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: underline; text-decoration-skip-ink: none; vertical-align: baseline; white-space: pre-wrap;">самый международный бакалавриат России уже в марте!</span></a></p></li><li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre;"><p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 10pt;" role="presentation"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Полезная передышка от подготовки к ЕГЭ :)</span></p></li></ul><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">И МНОГОЕ ДРУГОЕ!</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Чтобы участвовать в заочном отборе, тебе </span><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">нужно в ответном письме прислать заявку</span><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">.</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 800px; height: 359px;"><img src="https://lh5.googleusercontent.com/i_Jgy3fEKOHwNALVogasfh4S-unMLnnZy6eGmJjlxqbZXc1fENYvE_VFiUQm1NFhlbet8sXx30mFHZKrt_2mkIjnMGDXNSXBFdLD4NWUixcAFWNGDVlfgByBD1Vh5v1LpWY--F1V" width="100%" height="100%" style="margin-left: 0px; margin-top: 0px;"></span></span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">В заявку должны входить</span><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">:</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">1. </span><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(254, 12, 5); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">твоё краткое CV</span><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"> (от лат. Curriculum vitæ, в переводе — «ход жизни» или жизнеописание) </span><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">на английском языке</span><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">:&nbsp;</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Не забудь в <span zeum4c2="PR_1_0" data-ddnwab="PR_1_0" aria-invalid="spelling" class="LI ng">нём</span> указать:</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;"><li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre;"><p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">ФИО на русском</span></p></li><li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre;"><p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">и ФИ на английском языке</span></p></li><li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre;"><p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">дату рождения</span></p></li><li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre;"><p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">номер класса и школы</span></p></li><li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre;"><p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Город</span></p></li><li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre;"><p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">твои достижения и интересы</span></p></li></ul><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Файл должен быть в формате PDF,&nbsp; название файла: «Фамилия_Имя» </span><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">на английском языке.</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">2. </span><span style="font-size: 11pt; font-family: Arial; color: rgb(255, 0, 0); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Видеоролик на английском продолжительность — 2–3 минуты</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Суть видеоролика:</span></p><p dir="ltr" style="line-height: 1.38; margin-left: 60pt; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">a. вырази свое убеждение на любую тему, с которым не согласно большинство твоих сверстников,</span></p><p dir="ltr" style="line-height: 1.38; margin-left: 60pt; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">b. аргументируй свою позицию и</span></p><p dir="ltr" style="line-height: 1.38; margin-left: 60pt; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">c. поясни, почему большинство думает иначе.</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Несколько совет по подготовке ролика:</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">a) Старайся не использовать чужие мысли и тексты. В обратном случае обязательно сделай ссылку на автора.</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">b) Постарайся уместить свой основной тезис в первые 10 секунд своего видео, ведь зрителя нужно уметь заинтересовать за самое короткое время.</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">c) Продумай локацию съемки. Оригинальность приветствуется, но не в ущерб качеству звука и изображения!</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">d) Старайся не читать текст, говори на камеру.</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">e) Не забудь -&nbsp; видео должно быть только </span><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">на английском языке </span><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">— совсем без использования русского. Ведь заявку будут оценивать </span><a href="https://sas.utmn.ru/en/people-en/" style="text-decoration: none;"><span style="font-size: 11pt; font-family: Arial; color: rgb(246, 20, 14); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: underline; text-decoration-skip-ink: none; vertical-align: baseline; white-space: pre-wrap;">наши иностранные профессора</span></a><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"> (тут надо ссылку поменять, что бы вела на английскую версию сайта), а они не знают русский язык.</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Загрузи видео на Google диск с открытым доступом по ссылке. Пришли ссылку в письме вместе со своим резюме.</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Не бойся смелых идей! Удачи!</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 10.5pt; font-family: Arial; color: rgb(255, 0, 0); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Deadline: </span><span style="font-size: 10.5pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">заявки принимаются строго до 23:59 28 февраля 2022 (МСК)</span><span style="font-size: 10.5pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">.</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 10.5pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"><span style="border: none; display: inline-block; overflow: hidden; width: 424px; height: 234px;"><img src="https://ijfwyo.stripocdn.email/content/guids/CABINET_7a8bfd4b5eaf917634e115d1a7f44bdd/images/67681604661260849.gif" width="424" height="234" style="margin-left: 0px; margin-top: 0px;"></span></span></p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Результаты отбора придут на твою почту после </span><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">6 марта</span><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">. Обрати внимание, что </span><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">до 6 марта</span><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"> мы обязательно</span><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"> позвоним тебе</span><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">, если ты пройдешь первый этап отбора, и проведем</span><span style="font-size: 11pt; font-family: Arial; color: rgb(254, 12, 5); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"> короткое собеседование на английском языке</span><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">.</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; background-color: rgb(255, 255, 255); margin-top: 0pt; margin-bottom: 0pt;">&nbsp;</p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(34, 34, 34); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Если ты успешно пройдешь отборочное собеседование, мы пригласим* тебя провести три увлекательных дня в одном из самых комфортных университетских пространств России. Проживание и питание в дни Интенсива для участников бесплатные.</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: italic; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">*Билеты в Тюмень и обратно домой придётся приобрести за свой счёт.</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Ты сделаешь полезную передышку в подготовке к ЕГЭ и поймешь, что значит учиться в университете.</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">А если станешь лучшим и на мероприятиях интенсива «Ты. Университет. Будущее», то получишь шанс поступить на бесплатное место в </span><a href="https://sas.utmn.ru/ru/" style="text-decoration: none;"><span style="font-size: 11pt; font-family: Arial; color: rgb(254, 12, 5); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: underline; text-decoration-skip-ink: none; vertical-align: baseline; white-space: pre-wrap;">самый международный бакалавриат России уже в марте!</span></a></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Нам уже не терпится с тобой познакомиться! Если остались вопросы, обязательно <span zeum4c2="PR_3_0" data-ddnwab="PR_3_0" aria-invalid="spelling" class="LI ng">пиши</span> их.</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Команда SAS</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><b style="font-weight: normal;"><br></b></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(32, 33, 36); background-color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">P.S. Подписывайся на наши социальные сети!</span></p><p dir="ltr" style="line-height: 1.38; text-align: center; margin-top: 0pt; margin-bottom: 0pt;"><br class="gmail-Apple-interchange-newline"></p></span></div></div></td><td class="Aq">&nbsp;</td></tr></tbody></table>
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
    marketingTransporter.sendMail(mailOptions2, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
};
