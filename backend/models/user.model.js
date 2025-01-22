const mongoose = require('mongoose');

const EnrolledCourseSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  progress: { type: Number, default: 0 },
  completed_lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  started_at: { type: Date },
  completed_at: { type: Date }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  balance: { type: Number, required: true},
  bitcoin: { type: Number, required: true},
  dash: { type: Number, required: true},
  monero: { type: Number, required: true},
  ethereum: { type: Number, required: true},
  xrp: { type: Number, required: true},
  tether: { type: Number, required: true},
  bitcoinCash: { type: Number, required: true},
  bitcoinSV: { type: Number, required: true},
  litecoin: { type: Number, required: true},
  eos: { type: Number, required: true},
  binancecoin: { type: Number, required: true},
  tezos: { type: Number, required: true},
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  profile_picture: { type: String },
  enrolled_courses: [EnrolledCourseSchema],
  rewards: [
    {
      reward_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward' },
      earned_at: { type: Date }
    }
  ],
  preferences: {
    notifications: { type: Boolean, default: true },
    dark_mode: { type: Boolean, default: false }
  },
  last_login_date: { type: Date, default: null } 
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
