var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

  google: {
    id: Boolean,
    token: Boolean,
    email: Boolean,
    name: Boolean
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
        "Что вам больше всего понравилось в этом лекционном курсе": Boolean,
        "Что вам больше всего не понравилось в этом лекционном курсе": Boolean,
        "Что для вас было самым сложным в этом лекционном курсе": Boolean,
        "Как бы вы порекомендовали улучшить этот лекционный курс": Boolean
      },
      SEMINARS: {
        "Укажите имя и фамилию преподавателя, работавшего с вами на семинарах": Boolean,
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
        "Что вам больше всего понравилось в этом семинаре": Boolean,
        "Что вам больше всего не понравилось в этом семинаре": Boolean,
        "Что для вас было самым сложным в этом семинаре": Boolean,
        "Как бы вы порекомендовали улучшить этот семинар": Boolean
      }
    },
    "FEEDBACK":{
      ba_2019_q3_elective1: Boolean,
      ba_2019_q3_elective2: Boolean,
      ba_2019_q3_elective3: Boolean,
      ba_2019_q3_major1: Boolean,
      ba_2019_q3_major2: Boolean,
      ba_2019_q3_major3: Boolean,
      ba_2019_q3_esl: Boolean,
      ba_2019_q3_esl_speaking: Boolean,
      ba_2019_q2_esl_grammar: Boolean,
      ba_2019_year1_q2_aw: Boolean,
      ba_2019_year1_q3_qm: Boolean,
      ba_2019_year1_q3_history: Boolean,
      ba_2019_year1_q3_gb: Boolean,
      ba_2019_year2_q3_gb: Boolean,
      ba_2019_year1_q3_gi: Boolean,
      ba_2019_year2_q3_dt: Boolean,
      ba_2019_year2_q2_poms_louis: Boolean,
      ba_2019_year2_q2_poms_krishna: Boolean,
      ba_2019_year2_q2_poms_juliette: Boolean,
      ba_2019_year2_q2_aw: Boolean,
      ba_2019_year3_q3_rs: Boolean,

      ba_2019_q4_elective1: Boolean,
      ba_2019_q4_elective2: Boolean,
      ba_2019_q4_elective3: Boolean,
      ba_2019_q4_major1: Boolean,
      ba_2019_q4_major2: Boolean,
      ba_2019_q4_major3: Boolean,

      ba_2019_year1_q4_tfy: Boolean,
      ba_2019_year1_q4_history: Boolean,
      ba_2019_year1_q4_gb: Boolean,
      ba_2019_year2_q4_gb: Boolean,
      ba_2019_year1_q4_it: Boolean,
      ba_2019_year2_q4_dt: Boolean,
      ba_2019_year3_q4_rs: Boolean,

      ba_2020_q1_elective1: Boolean,
      ba_2020_q1_elective2: Boolean,
      ba_2020_q1_major1: Boolean,
      ba_2020_q1_major2: Boolean,
      ba_2020_q1_major3: Boolean,
      ba_2020_year1_q1_wtai: Boolean,
      ba_2020_year1_q1_qm: Boolean,
      ba_2020_year2_q1_poms: Boolean,
      ba_2020_year2_q1_art: Boolean,
      ba_2020_year2_q1_aw: Boolean,
      ba_2020_year4_q1_ec: Boolean,
      ba_2020_q1_rs: Boolean,
      ma_2020_year1_q1_mfc: Boolean,
      ma_2020_year1_q1_ffh1: Boolean,
      ma_2020_year1_q1_pci: Boolean,
      ma_2020_year1_q1_ae: Boolean,
      ma_2020_year2_q1_tpir: Boolean,
      ma_2020_year2_q1_me: Boolean,
      ma_xhe_2020_year1_q1_mu: Boolean,
      ma_xhe_2020_year1_q1_phok: Boolean,
      ma_xhe_2020_year1_q1_fl: Boolean,
      ma_xhe_2020_year1_q1_ps1: Boolean,

      ma_2019_wolf:Boolean,
      ma_2019_manovich:Boolean
    },
    "ELECTIVES":{
      "2019_2_2nd_year": {
        time: Boolean,
        elective1: Boolean,
        elective2: Boolean,
        elective3: Boolean,
        elective4: Boolean,
        elective5: Boolean,
        elective6: Boolean,
        elective7: Boolean,
        elective8: Boolean
      },
      "2019_2_1st_year": {
        time: Boolean,
        elective1: Boolean,
        elective2: Boolean,
        elective3: Boolean,
        elective4: Boolean
      },
      "2019_1_2nd_year": {
        time: Boolean,
        elective1: Boolean,
        elective2: Boolean,
        elective3: Boolean,
        elective4: Boolean,
        elective5: Boolean,
        elective6: Boolean,
        elective7: Boolean,
        elective8: Boolean
      },
      "2019_1_1st_year": {
        time: Boolean,
        elective1: Boolean,
        elective2: Boolean,
        elective3: Boolean,
        elective4: Boolean
      },
      electives_pre_2020: Boolean,
      electives_2020_2021_2: Boolean,
      "2020_1": {
        time: Boolean,
        elective1: Boolean,
        elective2: Boolean,
        elective3: Boolean,
        elective4: Boolean,
        elective5: Boolean,
        elective6: Boolean,
        elective7: Boolean,
        elective8: Boolean,
        elective9: Boolean,
        elective10: Boolean,
        elective11: Boolean,
        elective12: Boolean,
        elective13: Boolean,
        elective14: Boolean,
      },
      "pds_2019_classes": {
        time: Boolean,
        "9:40": Boolean,
        "11:30": Boolean,
        "14:00": Boolean,
        "15:40": Boolean
      },
      "ba_2018_quantitative_methods": {
        time: Boolean,
        track: Number
      },
      "ba_2018_history": {
        time: Boolean,
        track: Boolean
      }
    },
    "THECITYASTEXT":{
      video: Boolean
    },
    "majors": {
      major: Boolean,
      minor: Boolean,
      time : Boolean
    },
    "lesnik": {
      major: Boolean,
      time : Boolean
    },
    "turk": {
      major: Boolean,
      time : Boolean
    },
    "gi_topics_2020": {
      1: Boolean,
      2: Boolean,
      3: Boolean,
      4: Boolean,
      5: Boolean,
      6: Boolean,
      7: Boolean,
      8: Boolean,
      9: Boolean,
      10: Boolean,
      time : Boolean
    },
    generic: Boolean,
    generic2: Boolean,
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
