const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardioSchema = new Schema({
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
        type: Number,
        required: "a distance sets is required"
    }
});

const Cardio = mongoose.model("Cardio", cardioSchema);

module.exports = Cardio;