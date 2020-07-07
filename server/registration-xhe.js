module.exports = function (app, Session, transporter) {
// REGISTRATION ON THE SAS.UTMN.RU WEBSITE — CONFIRMATION EMAIL

  app.post('/polls/registration-xhe-open-day', function (req, res) {
    const mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: req.body['wpforms[fields][2]'], // list of receivers
      subject: 'Подтверждение участия в трансляции 14 июля | SAS Школа перспективных исследований', // Subject line
      html: `<div style="width:100%;font-family:arial,'helvetica neue',helvetica,sans-serif;padding:0;Margin:0"><div style="background-color:#f6f6f6"><table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"><tbody><tr style="border-collapse:collapse"><td valign="top" style="padding:0;Margin:0"><table cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse;border-spacing:0px;table-layout:fixed!important;width:100%"><tbody><tr style="border-collapse:collapse"><td align="center" bgcolor="#ffffff" style="padding:0;Margin:0;background-color:#ffffff"><table cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff" style="border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:90%"><tbody><tr style="border-collapse:collapse"><td align="left" bgcolor="transparent" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:transparent"></td></tr><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"><table cellpadding="0" cellspacing="0" align="left" style="border-collapse:collapse;border-spacing:0px;float:left"> <tbody><tr style="border-collapse:collapse"> <td align="left" style="padding:0;Margin:0;width:270px"> <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr style="border-collapse:collapse"> <td align="center" style="padding:0;Margin:0;font-size:0px"><img src="https://ci5.googleusercontent.com/proxy/pnpg4D6A36abuCBQwptawpxu0Lzu6RCScGYkySQq-S6X7RhPm9WHd6EHXBZ5Wb9PJjooP4ZhqmwDgST49ypOgF2QP0ZOL0ttlPUV1_TucyY-tKV21jlohDZEmDKbZT9ZIm9TAdRFBLM6L7pibfdgELZ04JwewcnpFPlL2NhNPFfWXc75hQ=s0-d-e1-ft#https://hfwucz.stripocdn.email/content/guids/CABINET_4a03c64835067141e0e0fd6c83d4254f/images/33981594041182412.png" alt="" style="display:block;border:0;outline:none;text-decoration:none" width="270" class="CToWUd a6T" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 285.5px; top: 122px;"><div id=":af" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Download attachment " data-tooltip-class="a1V" data-tooltip="Download"><div class="aSK J-J5-Ji aYr"></div></div></div></td> </tr> </tbody></table></td> </tr> </tbody></table>  <table cellpadding="0" cellspacing="0" align="right" style="border-collapse:collapse;border-spacing:0px;float:right"> <tbody><tr style="border-collapse:collapse"> <td align="left" style="padding:0;Margin:0;width:270px"> <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr style="border-collapse:collapse"> <td align="center" style="padding:0;Margin:0;font-size:0px"><a href="https://sas.utmn.ru/" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://sas.utmn.ru/&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNFG4DvF1JJwQAZYbH1sKD5P9hAMOw"><img src="https://ci6.googleusercontent.com/proxy/mWgfgLxttg7_OjkhWHfIMsE-nje1cHUaLGDgI7sygSxejCmu-EH_Y0U3H-VNkTo2Y9_wOthgJ-WjXFkNoYeilxQWCUZVLkiUXKdXQD-4rb7kwNjiSUGEpzewmrBIYxIx2T4qmsMQZV2fJJ5K6Jb0b_QpMK2wYbOI2Gxvt31QQJXcx652rg=s0-d-e1-ft#https://hfwucz.stripocdn.email/content/guids/CABINET_4a03c64835067141e0e0fd6c83d4254f/images/34341589633221986.png" alt="" style="display:block;border:0;outline:none;text-decoration:none" width="270" class="CToWUd"></a></td> </tr> </tbody></table></td> </tr> </tbody></table> </td> </tr> </tbody></table></td> </tr> </tbody></table> <table cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse;border-spacing:0px;table-layout:fixed!important;width:100%"> <tbody><tr style="border-collapse:collapse"> <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0;background-color:#ffffff"> <table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:90%"> <tbody><tr style="border-collapse:collapse"> <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr style="border-collapse:collapse"> <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr style="border-collapse:collapse"> <td align="left" style="padding:0;Margin:0"><p style="Margin:0;font-size:14px;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333333"><span class=""><span style="color:#ff0000;font-size:16px">Уважаемый(-ая) ${req.body["wpforms[fields][1]"]}</span><br><br>Спасибо за интерес к <a href="https://sas.utmn.ru/" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://sas.utmn.ru/&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNFG4DvF1JJwQAZYbH1sKD5P9hAMOw">Школе перспективных исследований (SAS)</a> Тюменского государственного университета!<br><br><strong>Ваша регистрация на онлайн-трансляцию презентации новой магистерской программы «<a href="https://sas.utmn.ru/ru/ma-ehe/" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://sas.utmn.ru/ru/ma-ehe/&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNHWK_poiGSLQzZTyzeR8noy8xWnyQ">Экспериментальное высшее образование</a>» (<a href="https://sas.utmn.ru/en/ma-ehe-en/" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://sas.utmn.ru/en/ma-ehe-en/&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNEtiKJGXVj1aiiIzYdiB4H4ZbEryg">Master of Arts in Experimental Higher Education, MA X-HE</a>) подтверждена.</strong><br><br><a href="https://www.youtube.com/watch?v=7BIt44RKFJY&amp;feature=youtu.be" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.youtube.com/watch?v%3D7BIt44RKFJY%26feature%3Dyoutu.be&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNHxxMnaUBdg0GjwUDgyMYML0u0Pfw">Трансляция</a>&nbsp;начнется <strong>14 июля 2020 в 14:00 по московскому времени </strong><a href="https://www.youtube.com/watch?v=7BIt44RKFJY&amp;feature=youtu.be" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.youtube.com/watch?v%3D7BIt44RKFJY%26feature%3Dyoutu.be&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNHxxMnaUBdg0GjwUDgyMYML0u0Pfw">на канале SAS в YouTube.</a><br><br></span>Для того чтобы включить уведомления нужно подписаться на канал SAS и нажать «колокольчик».<br><br>Ждем вас!&nbsp;</p></td> </tr> <tr style="border-collapse:collapse"> <td align="center" style="padding:0;Margin:0;padding-top:5px;font-size:0"> <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr style="border-collapse:collapse"> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><a href="https://www.facebook.com/sas.utmn.ru/" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/sas.utmn.ru/&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNFB_LwvsCzNLxhm1GXH5IoFl8fCMg"><img title="Facebook" src="https://ci5.googleusercontent.com/proxy/IWWVb0KIJsCTcsQjrDcP5GqIW3cM76Y_cQVFfA0RbHBO6hluizSaKrTpqg0GaF10ehxZXm5nZWgmDdrRHb_hmwyM3HudBk_PkoUiZESlWmEKnUTqtISZvoPXup77EujIyZ4waiq3IpCU363FbQcdlzTFsKg=s0-d-e1-ft#https://hfwucz.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none" class="CToWUd"></a></td> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><a href="https://www.twitter.com/sas_utmn/" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.twitter.com/sas_utmn/&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNEFR0nsMMpA3qyW1b752JGVnZg59Q"><img title="Twitter" src="https://ci4.googleusercontent.com/proxy/ZYJRh7fRhjrfBlq15gdIchJXLrkubQDh64G_uB11Y-XfpPe5KdxPDztBybb7ywWSQ8qGPkeRlI_hIPgQMRQnk1cVIsXZhpw3dCZZvoQr8CdqBnz5ka7qDNB1KfPbyUhzJ9Ffn6PREvTjCbBPHceZkQXaKA=s0-d-e1-ft#https://hfwucz.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none" class="CToWUd"></a></td> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><a href="https://www.instagram.com/sas_utmn/" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/sas_utmn/&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNGfsZqI6Cvj53s4HgjtLYcvHdr9_g"><img title="Instagram" src="https://ci4.googleusercontent.com/proxy/gPjFckPZjrJBrzJn5izhxweLHIZiEuVaxC5Imd-4ggp-0AVDCAZre8qqQDhD4S9N8cqvlfcjjp_sMfrHIT2nFDJHFrd71n3vD38HAQ4enIap3EpEtnFpeSaUOX76K5TP2bbCHm8i_A8P1jEY6i-Z5TpUiomL=s0-d-e1-ft#https://hfwucz.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none" class="CToWUd"></a></td> <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><a href="https://www.youtube.com/channel/UCTOl5FTiDD-n61Xiu0e_Uvg" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.youtube.com/channel/UCTOl5FTiDD-n61Xiu0e_Uvg&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNFVzUfCcgjgkXCJSf3ZkXL_tJJ2Og"><img title="Youtube" src="https://ci6.googleusercontent.com/proxy/aMiVuZVnjBdP01UGGSHVoVKkKmyx3RPCFKZF4OluTThRRn0Oo1rVMzYGuVwMZGNchYOEFD1VKqG1sUpn_pbJ7pyMcnO7fzPAYol0zxQ--UEZzlr9jYFw5zLyS7w1jryKCJ89ECtnFQ0KqUKgNT5-xvbA4w=s0-d-e1-ft#https://hfwucz.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none" class="CToWUd"></a></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> <tr style="border-collapse:collapse"> <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px"> <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr style="border-collapse:collapse"> <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr style="border-collapse:collapse"> <td align="left" style="padding:0;Margin:0;padding-bottom:5px"><h2 style="Margin:0;line-height:29px;font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#ff0000;text-align:center">Эксперименты в высшем образовании</h2><h2 style="Margin:0;line-height:29px;font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#ff0000;text-align:center">должны стать нормой</h2></td> </tr> <tr style="border-collapse:collapse"> <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;font-size:16px;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:24px;color:#ff0000"><br></p><p style="Margin:0;font-size:14px;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333333"><a href="https://www.universityworldnews.com/post.php?story=20200624152437652" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.universityworldnews.com/post.php?story%3D20200624152437652&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNHey4Zfon-U6h3iKrFujIst9PwqQw">University World News</a> опубликовали программную статью разработчиков новой магистерской программы SAS «Экспериментальное высшее образование» <br>(Master of Arts in Experimental Higher Education, MA X-HE) Дары Мельник и <br>Даниэла Контовского «Экспериментирование в университетском образовании должно стать нормой», посвященную теме контролируемого эксперимента в университетском образовании.</p></td> </tr> <tr style="border-collapse:collapse"> <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><span style="border-style:solid;border-color:#808080;background:#ff0000;border-width:0px;display:inline-block;border-radius:21px;width:auto"><a href="https://sas.utmn.ru/ru/experimentation-in-higher-education-must-become-the-norm/" style="text-decoration:none;font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:16px;color:#ffffff;border-style:solid;border-color:#ff0000;border-width:5px 30px 5px 30px;display:inline-block;background:#ff0000;border-radius:21px;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://sas.utmn.ru/ru/experimentation-in-higher-education-must-become-the-norm/&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNG2gzDw0_RqDbeAsvbGSrQmHMGqRw">Читать</a></span></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> <tr style="border-collapse:collapse"> <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px"> <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr style="border-collapse:collapse"> <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr style="border-collapse:collapse"> <td align="center" style="padding:0;Margin:0;padding-bottom:5px"><p style="Margin:0;font-size:24px;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:36px;color:#ff0000">Рефлексивное эссе Питера Джонса<br>по курсу «Темы первого года»</p></td> </tr> <tr style="border-collapse:collapse"> <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;font-size:14px;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:21px;color:#333333">Помнят ли студенты что-нибудь из прочитанного ими в университете? <br>В этом году мы поставили перед первокурсникам SAS необычную задачу: за шесть недель студенты должны были просмотреть всё, что они изучали с момента поступления в SAS, и найти проблему или неразрешённое противоречие, <br>которое не даёт им покоя.</p></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table><div><div class=""> <table cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse;border-spacing:0px;table-layout:fixed!important;width:100%"> <tbody><tr style="border-collapse:collapse"> <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0;background-color:#ffffff"> <table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:90%"> <tbody><tr style="border-collapse:collapse"> <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr style="border-collapse:collapse"> <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr style="border-collapse:collapse"> <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><span style="border-style:solid;border-color:#808080;background:#ff0000;border-width:0px;display:inline-block;border-radius:21px;width:auto"><a href="https://sas.utmn.ru/ru/topics-of-the-first-year-2020/" style="text-decoration:none;font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:16px;color:#ffffff;border-style:solid;border-color:#ff0000;border-width:5px 30px 5px 30px;display:inline-block;background:#ff0000;border-radius:21px;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://sas.utmn.ru/ru/topics-of-the-first-year-2020/&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNGgaAmxIlkwGbWZrEd4KsiQwmuKGA">Читать</a></span></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table> <table cellspacing="0" cellpadding="0" align="center" style="border-collapse:collapse;border-spacing:0px;table-layout:fixed!important;width:100%"> <tbody><tr style="border-collapse:collapse"> <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0;background-color:#ffffff"> <table style="border-collapse:collapse;border-spacing:0px;background-color:transparent;width:90%" cellspacing="0" cellpadding="0" align="center" bgcolor="#ffffff"> <tbody><tr style="border-collapse:collapse"> <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-color:#ffffff"> <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr style="border-collapse:collapse"> <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr style="border-collapse:collapse"> <td align="center" style="padding:0;Margin:0;font-size:0"> <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px"> <tbody><tr style="border-collapse:collapse"> <td align="center" valign="top" style="padding:0;Margin:0;padding-right:10px"><a href="https://www.facebook.com/sas.utmn.ru/" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/sas.utmn.ru/&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNFB_LwvsCzNLxhm1GXH5IoFl8fCMg"><img title="Facebook" src="https://ci5.googleusercontent.com/proxy/IWWVb0KIJsCTcsQjrDcP5GqIW3cM76Y_cQVFfA0RbHBO6hluizSaKrTpqg0GaF10ehxZXm5nZWgmDdrRHb_hmwyM3HudBk_PkoUiZESlWmEKnUTqtISZvoPXup77EujIyZ4waiq3IpCU363FbQcdlzTFsKg=s0-d-e1-ft#https://hfwucz.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none" class="CToWUd"></a></td> <td align="center" valign="top" style="padding:0;Margin:0;padding-right:10px"><a href="https://www.twitter.com/sas_utmn/" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.twitter.com/sas_utmn/&amp;source=gmail&amp;ust=1594128968796000&amp;usg=AFQjCNEFR0nsMMpA3qyW1b752JGVnZg59Q"><img title="Twitter" src="https://ci4.googleusercontent.com/proxy/ZYJRh7fRhjrfBlq15gdIchJXLrkubQDh64G_uB11Y-XfpPe5KdxPDztBybb7ywWSQ8qGPkeRlI_hIPgQMRQnk1cVIsXZhpw3dCZZvoQr8CdqBnz5ka7qDNB1KfPbyUhzJ9Ffn6PREvTjCbBPHceZkQXaKA=s0-d-e1-ft#https://hfwucz.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none" class="CToWUd"></a></td> <td align="center" valign="top" style="padding:0;Margin:0;padding-right:10px"><a href="https://www.instagram.com/sas_utmn/" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/sas_utmn/&amp;source=gmail&amp;ust=1594128968797000&amp;usg=AFQjCNHWl1pxi0L-5-15lKnRFLbFzQrbyg"><img title="Instagram" src="https://ci4.googleusercontent.com/proxy/gPjFckPZjrJBrzJn5izhxweLHIZiEuVaxC5Imd-4ggp-0AVDCAZre8qqQDhD4S9N8cqvlfcjjp_sMfrHIT2nFDJHFrd71n3vD38HAQ4enIap3EpEtnFpeSaUOX76K5TP2bbCHm8i_A8P1jEY6i-Z5TpUiomL=s0-d-e1-ft#https://hfwucz.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none" class="CToWUd"></a></td> <td align="center" valign="top" style="padding:0;Margin:0"><a href="https://www.youtube.com/channel/UCTOl5FTiDD-n61Xiu0e_Uvg" style="font-family:arial,'helvetica neue',helvetica,sans-serif;font-size:14px;text-decoration:underline;color:#ff0000" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.youtube.com/channel/UCTOl5FTiDD-n61Xiu0e_Uvg&amp;source=gmail&amp;ust=1594128968797000&amp;usg=AFQjCNFL4d4CbmI5NDvW_PJ2y_4hEybNpg"><img title="Youtube" src="https://ci6.googleusercontent.com/proxy/aMiVuZVnjBdP01UGGSHVoVKkKmyx3RPCFKZF4OluTThRRn0Oo1rVMzYGuVwMZGNchYOEFD1VKqG1sUpn_pbJ7pyMcnO7fzPAYol0zxQ--UEZzlr9jYFw5zLyS7w1jryKCJ89ECtnFQ0KqUKgNT5-xvbA4w=s0-d-e1-ft#https://hfwucz.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none" class="CToWUd"></a></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></td> </tr> </tbody></table></div></div></td> </tr> </tbody></table> </div> </div>`

          res.render('registration-xhe-open-day')

       // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });

    Session.findOne({
      session_id: req.session.id
    }, function (err, session) {
      if (err) { return done(err); }

      var newSession = new Session();
      parseSession(newSession, req, transporter);
    });

    req.flash('info', 'Благодарим за регистрацию.');
    res.render('registration-xhe-open-day', { messages: req.flash('info') });
  });

  app.get('/polls/registration-xhe', function (req, res) {
    res.render('registration-xhe');
  });

  app.post('/polls/registration-xhe', function (req, res) {
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
    //   var keyNames = Object.keys(req.body);
    //   keyNames.forEach((el)=>{
    //     console.log(req.body[el]);
    //
    //       sess.polls.ba_2018_year1_the_city_as_text[el] = req.body[el];
    // });
    let emailBody = '';
    var bodyKeys = Object.keys(req.body);
    for (let i = 0; i < bodyKeys.length; i++) {
      emailBody += '<p><b>' + bodyKeys[i] + '</b>: ' + req.body[bodyKeys[i]] + '</p>';
    }
    const mailOptions = {
      from: '"SAS" <sas@utmn.ru>', // sender address
      to: 'm.agliulin@utmn.ru,s.makhmudova@utmn.ru', // list of receivers
      subject: 'SAS — X-HE Registration', // Subject line
      // text: JSON.stringify(req.user), // plain text body
      html: emailBody.toString() // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
    sess.polls.registration_xhe.data = JSON.stringify(req.body);
    sess.polls.registration_xhe.time = now.toLocaleString('en-US', { timeZone: 'Asia/Yekaterinburg' });
    sess.save(function (err) {
      if (err) { return console.error(err); }
    });
  }
};
