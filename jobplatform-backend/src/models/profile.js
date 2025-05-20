const mongoose = require("mongoose");

const { Schema } = mongoose;

const workSchema = new Schema({
  job_title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: Date,
  current: {
    type: Boolean,
    default: false,
  },
  description: String,
});

const skillSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  proficiency: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "intermediate",
  },
});

const profileSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    skill: {
      type: [skillSchema],
      default: [],
    },
    location: {
      city: String,
      state: String,
      country: String,
      postal_code: String,
    },
    experience: {
      type: [workSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
