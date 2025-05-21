const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  title: {                     
    type: String,
    required: true,         
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,         
    trim: true
  },
  skills: {
    type: [String],
    required: true
  },
  jobType:{
    type:String,
    enum:["full-time","part-time","contract","remote","onsite","any"]
  },
  experience: {
    type: String,
    enum:["0-1","1-3","3-5","5+"]
  },
  salary:{
    type:Number
  },
  location: {
    city: String,
    state: String,
    country: String,
    postal_code: String,
  },
});

module.exports = mongoose.model('Job', jobSchema);
