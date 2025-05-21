const mongoose = require("mongoose");

const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    skills: {
      type: [String],
      required: true
    },
    jobType:{
      type:String,
      enum:["full-time","part-time","contract","remote","onsite","any"]
    },
    location: {
      city: String,
      state: String,
      country: String,
      postal_code: String,
    },
    experience: {
      type: String,
      enum:["0-1","1-3","3-5","5+"]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
