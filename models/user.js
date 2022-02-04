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
    FEEDBACK: {
      ba_2021_year2_q4_gb_1: Boolean,
      ba_2021_year2_q4_gb_2: Boolean,
      ba_2021_year2_q4_gb_3: Boolean,
      ba_2021_year2_q4_gb_4: Boolean,

      ba_2021_year2_q1_gb_1: Boolean,
      ba_2021_year2_q1_gb_2: Boolean,
      ba_2021_year2_q1_gb_3: Boolean,
      ba_2021_year2_q1_gb_4: Boolean,
      ba_2021_q1_elective1: Boolean,
      ba_2021_q1_elective2: Boolean,
      ba_2021_q1_elective3: Boolean,
      ba_2021_q1_elective4: Boolean,
      ba_2021_q1_major1: Boolean,
      ba_2021_q1_major2: Boolean,
      ba_2021_q1_major3: Boolean,
      ba_2021_q1_major4: Boolean,
      ba_2021_year1_q1_wtai: Boolean,
      ba_2021_year1_q1_paideia: Boolean,
      ba_2021_year2_q1_lam: Boolean,
      ma_xhe_2021_year1_q1_mu: Boolean,
      ma_xhe_2021_year1_q1_dm: Boolean,
      ma_xhe_2021_year1_q1_fol: Boolean,
      ma_xhe_2021_year1_q1_ps1: Boolean,
      ma_xhe_2021_year2_q1_che: Boolean,
      ma_xhe_2021_year2_q1_ps5: Boolean,

      ba_2021_q2_elective1: Boolean,
      ba_2021_q2_elective2: Boolean,
      ba_2021_q2_elective3: Boolean,
      ba_2021_q2_elective4: Boolean,
      ba_2021_q2_major1: Boolean,
      ba_2021_q2_major2: Boolean,
      ba_2021_q2_major3: Boolean,
      ba_2021_q2_major4: Boolean,
      ba_2021_q2_fys: Boolean,
      ba_2021_year1_q2_gb1: Boolean,
      ba_2021_year1_q2_history: Boolean,
      ba_2021_year1_q2_qr: Boolean,
      ba_2021_year2_q2_art: Boolean,
      ba_2021_year2_q2_sat: Boolean,
      ba_2021_year4_q2_ec: Boolean,
      ba_2021_q2_rs: Boolean,
      ma_xhe_2021_year1_q2_mu: Boolean,
      ma_xhe_2021_year1_q2_ep: Boolean,
      ma_xhe_2021_year1_q2_icd: Boolean,
      ma_xhe_2021_year1_q2_eoe: Boolean,
      ma_xhe_2021_year1_q2_ps2: Boolean,
      ma_xhe_2021_year2_q2_hep: Boolean,
      ma_xhe_2021_year2_q2_ps6: Boolean,

      ma_xhe_2021_year1_q3_oa: Boolean,

      pds_2021_1: Boolean,
      pds_2021_2: Boolean,
      pds_2021_3: Boolean,
      pds_2021_4: Boolean,
      pds_2021_5: Boolean,
      pds_2021_6: Boolean,
      pds_2021_7: Boolean,
      pds_2021_8: Boolean,
      pds_2021_9: Boolean,
      pds_2021_10: Boolean

    },
    ELECTIVES: {
      electives_pre_2020: String,
      electives_pre_2021: String,
      electives_2021_2022_2: String,
      electives_2021_2022_3: String,
      electives_2021_2022_4: String,
      '2020_1': {
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
        elective14: String
      }
    },
    majors: {
      major: String,
      minor: String,
      time: String
    },
    majors_2021: {
      major: String,
      minor: String,
      time: String
    },
    candidates: {
      data: String,
      time: String
    },
    gi_topics_2020: {
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
      time: String
    },
    generic: String,
    generic2: String,
    generic3: String,
    generic4: String
  }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
