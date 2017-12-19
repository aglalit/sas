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

    GI_part3: {
      time: String,
      LECTURES: {
        "Оцените сложность содержания лекций": Number,
        "Насколько новым для вас было содержание лекций": Number,
        "Насколько изменились ваше мышление, знания и умения под воздействием лекций": Number,
        "Что вам больше всего понравилось на лекциях?": String,
        "Что вам больше всего не понравилось на лекциях?": String
      },
      SEMINARS: {
        "Оцените, насколько понятной для вас была установка на групповую работу": Number,
        "Что именно для вас было непонятным и самым сложным в установке на групповую работу?": String,
        "Укажите имя и фамилию куратора, организовывавшего групповую работу": String,
        "Насколько хорошо куратор организует интерактивную коммуникацию в группе?": Number,
        "Сколько процентов обязательных текстов по этой части курса вы успевали прочесть": Number,
        "Что для вас было самым сложным в групповой работе?": String,
        "Что для вас было самым сложным на пленаре?": String,
        "Как бы вы порекомендовали улучшить этот курс": String
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
        "lecture1": Boolean,
        "lecture2": Boolean,
        "ФИО":String
      }
  }

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Session', sessionSchema);
