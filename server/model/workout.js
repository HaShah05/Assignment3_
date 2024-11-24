//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let workoutModel = mongoose.Schema({
    Date: String,
    Exercise: String,
    Sets: Number,
    Reps: Number,
},
{
    collection:"Bio_workouts"
});
module.exports =mongoose.model('Workout',workoutModel);
