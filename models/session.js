var mongoose = require('mongoose');

// define the schema for our user model
var sessionSchema = mongoose.Schema({

  session_id: String,
  polls: {
      faculty_trips: String,
      faculty_research_trips: String,
      planned_absences_professors: String,
      planned_absences_students: String,

      ba_2021_year2_q1_gb_1: String,
      ba_2021_year2_q1_gb_2: String,
      ba_2021_year2_q1_gb_3: String,
      ba_2021_year2_q1_gb_4: String,
      ba_2021_q1_elective1: String,
      ba_2021_q1_elective2: String,
      ba_2021_q1_elective3: String,
      ba_2021_q1_elective4: String,
      ba_2021_q1_major1: String,
      ba_2021_q1_major2: String,
      ba_2021_q1_major3: String,
      ba_2021_q1_major4: String,
      ba_2021_year1_q1_wtai: String,
      ba_2021_year1_q1_paideia: String,
      ba_2021_year2_q1_lam: String,
      ma_xhe_2021_year1_q1_mu: String,
      ma_xhe_2021_year1_q1_dm: String,
      ma_xhe_2021_year1_q1_fol: String,
      ma_xhe_2021_year1_q1_ps1: String,
      ma_xhe_2021_year2_q1_che: String,
      ma_xhe_2021_year2_q1_ps5: String,

      ba_2021_q2_elective1: String,
      ba_2021_q2_elective2: String,
      ba_2021_q2_elective3: String,
      ba_2021_q2_elective4: String,
      ba_2021_q2_major1: String,
      ba_2021_q2_major2: String,
      ba_2021_q2_major3: String,
      ba_2021_q2_major4: String,
      ba_2021_q2_fys: String,
      ba_2021_year1_q2_gb1: String,
      ba_2021_year1_q2_history: String,
      ba_2021_year1_q2_qr: String,
      ba_2021_year2_q2_art: String,
      ba_2021_year2_q2_sat: String,
      ba_2021_year4_q2_ec: String,
      ba_2021_q2_rs: String,
      ma_xhe_2021_year1_q2_mu: String,
      ma_xhe_2021_year1_q2_ep: String,
      ma_xhe_2021_year1_q2_icd: String,
      ma_xhe_2021_year1_q2_eoe: String,
      ma_xhe_2021_year1_q2_ps2: String,
      ma_xhe_2021_year2_q2_hep: String,
      ma_xhe_2021_year2_q2_ps6: String,

      ba_2021_q3_elective1: String,
      ba_2021_q3_elective2: String,
      ba_2021_q3_elective3: String,
      ba_2021_q3_elective4: String,
      ba_2021_q3_major1: String,
      ba_2021_q3_major2: String,
      ba_2021_q3_major3: String,
      ba_2021_q3_major4: String,
      ba_2021_year1_q3_gb2: String,
      ba_2021_year1_q3_it: String,
      ba_2021_year1_q3_aw: String,
      ba_2021_year2_q3_gb_1: String,
      ba_2021_year2_q3_gb_2: String,
      ba_2021_year2_q3_gb_3: String,
      ba_2021_year2_q3_gb_4: String,
      ba_2021_year2_q3_gi: String,
      ba_2021_q3_rs: String,
      ma_xhe_2021_year1_q3_ie: String,
      ma_xhe_2021_year1_q3_oa: String,
      ma_xhe_2021_year1_q3_pd: String,
      ma_xhe_2021_year2_q3_her: String,
      ma_xhe_2021_year1_q3_ps3: String,
      ma_xhe_2021_year2_q3_ps7: String,

      pds_2021_1: String,
      pds_2021_2: String,
      pds_2021_3: String,
      pds_2021_4: String,
      pds_2021_5: String,
      pds_2021_6: String,
      pds_2021_7: String,
      pds_2021_8: String,
      pds_2021_9: String,
      pds_2021_10: String,

      generic_anonymous: {
        data: String,
        time: String
      },

      generic_anonymous2: {
        data: String,
        time: String
      },

      registration: {
        data: String,
        time: String
      },
      excellence_track: {
        data: String,
        time: String
      },
      registration_xhe: {
        data: String,
        time: String
      },
      registration_prospective_students: {
        data: String,
        time: String
      },
      dare_to_x_registration: String,
      open_day_04_2022: String,
      generic: String,
      generic2: String,
      poetry: {
        answer: Boolean,
        comments: String,
        time: String,
        ip: String
      },
      unsubscribe: {
        time: String,
        email_to_unsubscribe: String
      }
  }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Session', sessionSchema);
