const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        trim: true,
        required: "a type is required"
    },
    name: {
        type: String,
        trim: true,
        required: "a name is required"
    },
    duration: {
        type: Number,
        required: "a duration is required"
    },
    distance: {
        type: Number
        // required: "a distance sets is required"
    },
    weight: {
        type: Number
        // required: "a weight is required"
    },
    reps: {
        type: Number
        // required: "a number of reps is required"
    },
    sets: {
        type: Number
        // required: "a number of sets is required"
    }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;