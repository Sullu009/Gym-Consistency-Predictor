const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  exercise: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Workout", workoutSchema);