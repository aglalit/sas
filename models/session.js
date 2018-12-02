var mongoose = require('mongoose');

// define the schema for our user model
var sessionSchema = mongoose.Schema({

  session_id: String,
  polls: {
    // AI_Interpretation: {
    //   language: String,
    //   time: String,
    //   LECTURES: {
    //     "Как хорошо были организованы материалы курса": Number,
    //     "Насколько пунктуален был преподаватель (лекции)(лектор 1)": Number,
    //     "Насколько пунктуален был преподаватель (лекции)(лектор 2)": Number,
    //     "Насколько полно преподаватель следовал программе курса(лектор 1)": Number,
    //     "Насколько полно преподаватель следовал программе курса(лектор 2)": Number,
    //     "Оцените сложность лекций для вашего понимания(лектор 1)": Number,
    //     "Оцените сложность лекций для вашего понимания(лектор 2)": Number,
    //     "Насколько новым для вас было содержание лекций(лектор 1)": Number,
    //     "Насколько новым для вас было содержание лекций(лектор 2)": Number,
    //     "Насколько вам понравилась манера чтения лекций этим преподавателем(лектор 1)": Number,
    //     "Насколько вам понравилась манера чтения лекций этим преподавателем(лектор 2)": Number,
    //     "Насколько изменились ваше мышление, знания и умения": Number,
    //     "Хотите ли вы снова встретиться с этим преподавателем на других курсах(лектор 1)": Number,
    //     "Хотите ли вы снова встретиться с этим преподавателем на других курсах(лектор 2)": Number,
    //     "Если бы этот курс не входил в ядро, взяли бы вы его как электив": Number,
    //     "Что вам больше всего понравилось в этом лекционном курсе": String,
    //     "Что вам больше всего не понравилось в этом лекционном курсе": String,
    //     "Что для вас было самым сложным в этом лекционном курсе": String,
    //     "Как бы вы порекомендовали улучшить этот лекционный курс": String
    //   },
    //   SEMINARS: {
    //     "Укажите имя и фамилию преподавателя, работавшего с вами на семинарах": String,
    //     "Насколько полно преподаватель следовал темам": Number,
    //     "Насколько хорошо преподаватель организует интерактивную коммуникацию в группе": Number,
    //     "Сколько раз в течение одного семинарского занятия вы (в среднем) высказывались вслух": Number,
    //     "Насколько хорошо преподаватель объясняет материал": Number,
    //     "Насколько семинарские занятия помогли вам освоить материал лекций": Number,
    //     "Насколько пунктуален был преподаватель": Number,
    //     "Какую оценку (балл от 0 до 10) вы ожидаете получить за эту часть курса": Number,
    //     "Готовы ли вы снова встретиться с этим преподавателем на других курсах": Number,
    //     "Сколько процентов обязательных текстов по этой части курса вы успевали прочесть": Number,
    //     "Сколько часов в неделю вы уделяли внеаудиторной работе по этой части курса": Number,
    //     "Что вам больше всего понравилось в этом семинаре": String,
    //     "Что вам больше всего не понравилось в этом семинаре": String,
    //     "Что для вас было самым сложным в этом семинаре": String,
    //     "Как бы вы порекомендовали улучшить этот семинар": String
    //   }
    // },

    GI_part6: {
      time: String,
      LECTURES: {
        "Оцените сложность содержания лекций": Number,
        "Сколько процентов обязательных текстов по этой части курса вы успевали прочесть": Number,
        "Насколько новым для вас было содержание лекций": Number,
        "Насколько изменились ваше мышление, знания и умения под воздействием лекций": Number,
        "Как методические материалы для разбора выступлений проектных групп (таблица с «чекбоксами» и комментариями) помогли вам": Number,
        "Выступление какой группы было для вас самым интересным?": String
      },
      SEMINARS: {
        "Оцените, насколько понятной для вас была установка на групповую работу": Number,
        "Что именно для вас было непонятным и самым сложным в установке на групповую работу?": String,
        "Оцените насколько семинарские занятия помогли вам разобраться с содержанием темы этого модуля": Number,
        "Укажите имя и фамилию куратора, организовывавшего групповую работу": String,
        "Оцените эффективность формата самостоятельной групповой работы (без куратора)": Number,
        "Что для вас было самым интересным в групповой работе?": String,
        "Что для вас было самым интересным на пленаре?": String,
        "Как бы вы порекомендовали улучшить этот курс": String
      }
    },
    GI_volkov: {
      time: String,
      LECTURES: {
        "Оцените сложность содержания лекций": Number,
        "Что вам больше всего понравилось на лекциях?": String,
        "Что вам больше всего не понравилось на лекциях?": String
      },
      SEMINARS: {
        "Оцените, насколько понятной для вас была установка А.Е. Волкова на групповую работу": Number,
        "Что именно для вас было непонятным и самым сложным в установке на групповую работу?": String,
        "Укажите имя и фамилию куратора, организовывавшего групповую работу": String,
        "Что для вас было самым сложным в групповой работе?": String,
        "Насколько хорошо куратор организует интерактивную коммуникацию в группе?": Number,
        "Насколько изменились ваше мышление, знания и умения по результатам модуля с А.Е. Волковым?": Number
      }
    },
      open_day_17: {
        time: String,
        "lecture1": String,
        "lecture2": String,
        "lecture3": String,
        "ФИО":String,
        "Номер школы, лицея, гимназии": String,
        "Класс":Number,
        "Телефон":String,
        "Еmail":String,
        "Набор ЕГЭ, который ты выбрал или собираешься выбрать": String,
        "Эссе «В каком университете я хочу учиться»": String
      },
      "22_23_lectures": {
        "lecture1": String,
        "lecture2": String,
        "ФИО":String
      },
      "feminism": String,
      great_books_3_17: {
        time: String,
        "Укажите имя и фамилию преподавателя, работавшего с вами на семинарах":String,
        "Как хорошо были организованы материалы курса":Number,
        "Сколько процентов обязательных текстов по этой части курса вы успевали прочесть":Number,
        "Какой из прочитанных текстов оказал на вас наибольшее влияние? Почему?":String,
        "Насколько полно преподаватель следовал программе курса":Number,
        "Оцените сложность лекций для вашего понимания":Number,
        "Насколько новым для вас было содержание лекций":Number,
        "Насколько изменились ваше мышление, знания и умения":Number,
        "Насколько хорошо преподаватель организует интерактивную коммуникацию в группе":Number,
        "Насколько хорошо преподаватель объясняет материал":Number,
        "Что вам больше всего понравилось в этом лекционном курсе":String,
        "Что вам больше всего не понравилось в этом лекционном курсе":String,
        "Что для вас было самым сложным в этом лекционном курсе":String,
        "Как бы вы порекомендовали улучшить этот лекционный курс":String
      },
      electives_3_18: {
        time: String,
        "Укажите имя и фамилию преподавателя, работавшего с вами на семинарах":String,
        "Как хорошо были организованы материалы курса":Number,
        "Сколько процентов обязательных текстов по этой части курса вы успевали прочесть":Number,
        "Насколько полно преподаватель следовал программе курса":Number,
        "Оцените сложность лекций для вашего понимания":Number,
        "Насколько новым для вас было содержание лекций":Number,
        "Насколько изменились ваше мышление, знания и умения":Number,
        "Насколько хорошо преподаватель организует интерактивную коммуникацию в группе":Number,
        "Насколько хорошо преподаватель объясняет материал":Number,
        "Хотите ли вы снова встретиться с этим преподавателем на других курсах?":Number,
        "Что вам больше всего понравилось в этом лекционном курсе":String,
        "Что вам больше всего не понравилось в этом лекционном курсе":String,
        "Что для вас было самым сложным в этом лекционном курсе":String,
        "Как бы вы порекомендовали улучшить этот лекционный курс":String
      },
      TFY: {
        "Who taught this course?":String,
        "How well were the course materials organized?":Number,
        "How challenging was the course for you?":Number,
        "How well does the teacher explain the material?":Number,
        "How much did your thinking, knowledge and skills change during the course?":Number,
        "How well did your teacher organize interactive communication in your course?":Number,
        "What did you like best about the course?":String,
        "What did you dislike most about the course?":String,
        "How would you recommend we improve this course?":String
      },
      ma_2018_fedorova: {
        time: String,
        "Как хорошо были организованы материалы курса":Number,
        "Сколько процентов обязательных текстов по этой части курса вы успевали прочесть":Number,
        "Оцените сложность лекций для вашего понимания":Number,
        "Насколько новым для вас было содержание лекций":Number,
        "Насколько изменились ваше мышление, знания и умения":Number,
        "Насколько пунктуален был преподаватель?":Number,
        "Насколько хорошо преподаватель организует интерактивную коммуникацию в группе":Number,
        "Хотите ли вы снова встретиться с этим преподавателем на других курсах?":Number,
        "Насколько хорошо преподаватель объясняет материал?":Number,
        "Насколько преподаватель был доступен для дополнительных консультаций за пределами аудиторных занятий?":Number,
        "Что вам больше всего понравилось в этом лекционном курсе":String,
        "Что вам больше всего не понравилось в этом лекционном курсе":String,
        "Что для вас было самым сложным в этом лекционном курсе":String,
        "Как бы вы порекомендовали улучшить этот лекционный курс":String
      },
      ma_2018_chubarov: {
        time: String,
        "Как хорошо были организованы материалы курса":Number,
        "Сколько процентов обязательных текстов по этой части курса вы успевали прочесть":Number,
        "Оцените сложность лекций для вашего понимания":Number,
        "Насколько новым для вас было содержание лекций":Number,
        "Насколько изменились ваше мышление, знания и умения":Number,
        "Насколько пунктуален был преподаватель?":Number,
        "Насколько хорошо преподаватель организует интерактивную коммуникацию в группе":Number,
        "Хотите ли вы снова встретиться с этим преподавателем на других курсах?":Number,
        "Насколько хорошо преподаватель объясняет материал?":Number,
        "Насколько преподаватель был доступен для дополнительных консультаций за пределами аудиторных занятий?":Number,
        "Что вам больше всего понравилось в этом лекционном курсе":String,
        "Что вам больше всего не понравилось в этом лекционном курсе":String,
        "Что для вас было самым сложным в этом лекционном курсе":String,
        "Как бы вы порекомендовали улучшить этот лекционный курс":String
      },
      ma_2018_dobrovidova: {
        time: String,
        "Как хорошо были организованы материалы курса":Number,
        "Сколько процентов обязательных текстов по этой части курса вы успевали прочесть":Number,
        "Оцените сложность лекций для вашего понимания":Number,
        "Насколько новым для вас было содержание лекций":Number,
        "Насколько изменились ваше мышление, знания и умения":Number,
        "Насколько пунктуален был преподаватель?":Number,
        "Насколько хорошо преподаватель организует интерактивную коммуникацию в группе":Number,
        "Хотите ли вы снова встретиться с этим преподавателем на других курсах?":Number,
        "Насколько хорошо преподаватель объясняет материал?":Number,
        "Насколько преподаватель был доступен для дополнительных консультаций за пределами аудиторных занятий?":Number,
        "Что вам больше всего понравилось в этом лекционном курсе":String,
        "Что вам больше всего не понравилось в этом лекционном курсе":String,
        "Что для вас было самым сложным в этом лекционном курсе":String,
        "Как бы вы порекомендовали улучшить этот лекционный курс":String
      },
      ma_2018_apostolov: {
        time: String,
        "Как хорошо были организованы материалы курса":Number,
        "Сколько процентов обязательных текстов по этой части курса вы успевали прочесть":Number,
        "Оцените сложность лекций для вашего понимания":Number,
        "Насколько новым для вас было содержание лекций":Number,
        "Насколько изменились ваше мышление, знания и умения":Number,
        "Насколько пунктуален был преподаватель?":Number,
        "Насколько хорошо преподаватель организует интерактивную коммуникацию в группе":Number,
        "Хотите ли вы снова встретиться с этим преподавателем на других курсах?":Number,
        "Насколько хорошо преподаватель объясняет материал?":Number,
        "Насколько преподаватель был доступен для дополнительных консультаций за пределами аудиторных занятий?":Number,
        "Что вам больше всего понравилось в этом лекционном курсе":String,
        "Что вам больше всего не понравилось в этом лекционном курсе":String,
        "Что для вас было самым сложным в этом лекционном курсе":String,
        "Как бы вы порекомендовали улучшить этот лекционный курс":String
      },
      ma_2018_strukov: {
        time: String,
        "Как хорошо были организованы материалы курса":Number,
        "Сколько процентов обязательных текстов по этой части курса вы успевали прочесть":Number,
        "Оцените сложность лекций для вашего понимания":Number,
        "Насколько новым для вас было содержание лекций":Number,
        "Насколько изменились ваше мышление, знания и умения":Number,
        "Насколько пунктуален был преподаватель?":Number,
        "Насколько хорошо преподаватель организует интерактивную коммуникацию в группе":Number,
        "Хотите ли вы снова встретиться с этим преподавателем на других курсах?":Number,
        "Насколько хорошо преподаватель объясняет материал?":Number,
        "Насколько преподаватель был доступен для дополнительных консультаций за пределами аудиторных занятий?":Number,
        "Что вам больше всего понравилось в этом лекционном курсе":String,
        "Что вам больше всего не понравилось в этом лекционном курсе":String,
        "Что для вас было самым сложным в этом лекционном курсе":String,
        "Как бы вы порекомендовали улучшить этот лекционный курс":String
      },
      ba_2018_year1_module1_wtai: {
        time: String,
        "Who taught this course":String,
        "How well were the course materials organized":Number,
        "What percentage of the mandatory readings were you able to do during the course":Number,
        "What course readings did you find the most useful":String,
        "What course readings did you find the least useful":String,
        "How closely did the teacher follow the course syllabus":Number,
        "How well does the teacher explain the material":Number,
        "How well did your teacher organize interactive communication in your course":Number,
        "Did you feel comfortable speaking up in the classroom":Number,
        "Did your teacher return assignments in a timely fashion":Number,
        "Was your teacher accessible and helpful outside of the classroom":Number,
        "How challenging was the course for you":Number,
        "How much did your thinking, knowledge and skills change during the course":Number,
        "How often did you made your best effort to be attentive and engaged in this class":Number,
        "How consistently did you met the expectations for preparing for class":Number,
        "How strongly would you recommend this course to your peers":Number,
        "What did you like best about the course":String,
        "What did you dislike most about the course":String,
        "How would you recommend we improve this course":String
      },
      ba_2018_year2_module1_aw: {
        time: String,
        "Who taught this course":String,
        "How well were the course materials organized":Number,
        "What percentage of the mandatory readings were you able to do during the course":Number,
        "What course readings did you find the most useful":String,
        "What course readings did you find the least useful":String,
        "How closely did the teacher follow the course syllabus":Number,
        "How well does the teacher explain the material":Number,
        "How well did your teacher organize interactive communication in your course":Number,
        "Did you feel comfortable speaking up in the classroom":Number,
        "Did your teacher return assignments in a timely fashion":Number,
        "Was your teacher accessible and helpful outside of the classroom":Number,
        "How challenging was the course for you":Number,
        "How much did your thinking, knowledge and skills change during the course":Number,
        "How often did you made your best effort to be attentive and engaged in this class":Number,
        "How consistently did you met the expectations for preparing for class":Number,
        "How strongly would you recommend this course to your peers":Number,
        "What did you like best about the course":String,
        "What did you dislike most about the course":String,
        "How would you recommend we improve this course":String
      },
      ba_2018_year2_module1_electives: {
        time: String,
        "Who taught this course":String,
        "How well were the course materials organized":Number,
        "What percentage of the mandatory readings were you able to do during the course":Number,
        "What course readings did you find the most useful":String,
        "What course readings did you find the least useful":String,
        "How closely did the teacher follow the course syllabus":Number,
        "How well does the teacher explain the material":Number,
        "How well did your teacher organize interactive communication in your course":Number,
        "Did you feel comfortable speaking up in the classroom":Number,
        "Did your teacher return assignments in a timely fashion":Number,
        "Was your teacher accessible and helpful outside of the classroom":Number,
        "How challenging was the course for you":Number,
        "How much did your thinking, knowledge and skills change during the course":Number,
        "How often did you made your best effort to be attentive and engaged in this class":Number,
        "How consistently did you met the expectations for preparing for class":Number,
        "How strongly would you recommend this course to your peers":Number,
        "What did you like best about the course":String,
        "What did you dislike most about the course":String,
        "How would you recommend we improve this course":String
      },
      ba_2018_year2_module5_art: {
        time: String,
        "Did you find the lecture component of the course useful":Number,
        "Did you find the practice component of the course useful":Number,
        "How well were the course materials organized":Number,
        "What percentage of the mandatory readings were you able to do during the course":Number,
        "How closely did the teacher follow the course syllabus1":Number,
        "How well does the teacher explain the material1":Number,
        "How well did your teacher organize interactive communication in your course1":Number,
        "Did you feel comfortable speaking up in the classroom1":Number,
        "Did your teacher return assignments in a timely fashion1":Number,
        "Was your teacher accessible and helpful outside of the classroom1":Number,
        "How closely did the teacher follow the course syllabus2":Number,
        "How well does the teacher explain the material2":Number,
        "How well did your teacher organize interactive communication in your course2":Number,
        "Did you feel comfortable speaking up in the classroom2":Number,
        "Did your teacher return assignments in a timely fashion2":Number,
        "Was your teacher accessible and helpful outside of the classroom2":Number,
        "How challenging was the course for you":Number,
        "How much did your thinking, knowledge and skills change during the course":Number,
        "How often did you made your best effort to be attentive and engaged in this class":Number,
        "How consistently did you met the expectations for preparing for class":Number,
        "How strongly would you recommend this course to your peers":Number,
        "What did you like best about the course":String,
        "What did you dislike most about the course":String,
        "How would you recommend we improve this course":String
      },
      ma_2018_art: {
        time: String,
        "Did you find the lecture component of the course useful":Number,
        "Did you find the practice component of the course useful":Number,
        "How well were the course materials organized":Number,
        "What percentage of the mandatory readings were you able to do during the course":Number,
        "How closely did the teacher follow the course syllabus1":Number,
        "How well does the teacher explain the material1":Number,
        "How well did your teacher organize interactive communication in your course1":Number,
        "Did you feel comfortable speaking up in the classroom1":Number,
        "Did your teacher return assignments in a timely fashion1":Number,
        "Was your teacher accessible and helpful outside of the classroom1":Number,
        "How challenging was the course for you":Number,
        "How much did your thinking, knowledge and skills change during the course":Number,
        "How often did you made your best effort to be attentive and engaged in this class":Number,
        "How consistently did you met the expectations for preparing for class":Number,
        "How strongly would you recommend this course to your peers":Number,
        "What did you like best about the course":String,
        "What did you dislike most about the course":String,
        "How would you recommend we improve this course":String
      },
      ba_2018_year2_gi_preliminary: {
        "Какая проблема (тема), охватывающая весь мир, кажется вам наиболее актуальной?": String
      },
      ba_2018_year1_the_city_as_text: {
        "answers": String
      },
      ba_2018_year2_module5_poms: String,
      faculty_trips: String,
      open_day_2018: String,
      open_day_2018_voting: String
  }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Session', sessionSchema);
