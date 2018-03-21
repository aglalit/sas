﻿var mongoose = require('mongoose');
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
    "ELECTIVES":{
      "2module__electives": {
        time: String,
        elective1: String,
        elective2: String,
        elective3: String
      },
      "3module__electives": {
        time: String,
        elective1: String,
        elective2: String,
        elective3: String
      },
      "4module__electives": {
        time: String,
        elective1: String,
        elective2: String,
        elective3: String
      },
      "2module__surendra": {
        time: String,
        value: String
      }
    }
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
