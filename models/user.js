var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  polls: {
    AI_Metaphor: {
      LECTURES: {
        "Как хорошо были организованы материалы курса": Number,
        "Насколько пунктуален был преподаватель (лекции)": Number,
        "Насколько полно преподаватель следовал программе курса": Number,
        "Оцените сложность лекций для вашего понимания": Number,
        "Насколько новым для вас было содержание лекций": Number,
        "Насколько вам понравилась манера чтения лекций этим преподавателем": Number,
        "Насколько изменились ваше мышление, знания и умения": Number,
        "Хотите ли вы снова встретиться с этим преподавателем на других курсах": Number,
        "Если бы этот курс не входил в ядро, взяли бы вы его как электив": Number,
        "Что вам больше всего понравилось в этом лекционном курсе": String,
        "Что вам больше всего не понравилось в этом лекционном курсе": String,
        "Что для вас было самым сложным в этом лекционном курсе": String,
        "Как бы вы порекомендовали улучшить этот лекционный курс": String
      },
      SEMINARS: {
        "Укажите имя и фамилию преподавателя, работавшего с вами на семинарах": String,
        "Насколько полно преподаватель следовал темам": Number,
        "Насколько хорошо преподаватель организует интерактивную коммуникацию в группе": Number,
        "Сколько раз в течение одного семинарского занятия вы (в среднем) высказывались вслух": Number,
        "Насколько хорошо преподаватель объясняет материал": Number,
        "Насколько семинарские занятия помогли вам освоить материал лекций": Number,
        "Насколько пунктуален был преподаватель": Number,
        "Какую оценку (балл от 0 до 10) вы ожидаете получить за эту часть курса": Number,
        "Готовы ли вы снова встретиться с этим преподавателем на других курсах": Number,
        "Сколько процентов обязательных текстов по этой части курса вы успевали прочесть": Number,
        "Сколько часов в неделю вы уделяли внеаудиторной работе по этой части курса": Number,
        "Что вам больше всего понравилось в этом семинаре": String,
        "Что вам больше всего не понравилось в этом семинаре": String,
        "Что для вас было самым сложным в этом семинаре": String,
        "Как бы вы порекомендовали улучшить этот семинар": String
      }
    },
    "FEEDBACK":{
      ba_2019_q2_elective1: Boolean,
      ba_2019_q2_elective2: Boolean,
      ba_2019_q2_elective3: Boolean,
      ba_2019_q2_major1: Boolean,
      ba_2019_q2_major2: Boolean,
      ba_2019_q2_major3: Boolean,
      ba_2019_year1_q2_aw: Boolean,
      ba_2019_year1_q2_qm: Boolean,
      ba_2019_year1_q2_history: Boolean,
      ba_2019_year1_q2_gb: Boolean,
      ba_2019_year2_q2_poms_louis: Boolean,
      ba_2019_year2_q2_poms_krishna: Boolean,
      ba_2019_year2_q2_poms_juliette: Boolean,
      ba_2019_year2_q2_aw: Boolean,
    },
    "ELECTIVES":{
      "2019_2_2nd_year": {
        time: String,
        elective1: String,
        elective2: String,
        elective3: String,
        elective4: String,
        elective5: String,
        elective6: String,
        elective7: String,
        elective8: String
      },
      "2019_2_1st_year": {
        time: String,
        elective1: String,
        elective2: String,
        elective3: String,
        elective4: String
      },
      "2019_1_2nd_year": {
        time: String,
        elective1: String,
        elective2: String,
        elective3: String,
        elective4: String,
        elective5: String,
        elective6: String,
        elective7: String,
        elective8: String
      },
      "2019_1_1st_year": {
        time: String,
        elective1: String,
        elective2: String,
        elective3: String,
        elective4: String
      },
      "2020_1": {
        time: String,
        elective1: String,
        elective2: String,
        elective3: String,
        elective4: String,
        elective5: String,
        elective6: String,
        elective7: String,
        elective8: String,
        elective9: String,
        elective10: String,
        elective11: String,
        elective12: String,
        elective13: String,
      },
      "pds_2019_classes": {
        time: String,
        "9:40": String,
        "11:30": String,
        "14:00": String,
        "15:40": String
      },
      "ba_2018_quantitative_methods": {
        time: String,
        track: Number
      },
      "ba_2018_history": {
        time: String,
        track: String
      }
    },
    "THECITYASTEXT":{
      video: String
    },
    "majors": {
      major: String,
      minor: String,
      time : String
    },
    "gi_topics_2020": {
      1: String,
      2: String,
      3: String,
      4: String,
      5: String,
      6: String,
      7: String,
      8: String,
      9: String,
      10: String,
      time : String
    },
    generic: String,
    generic2: String,
  }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
