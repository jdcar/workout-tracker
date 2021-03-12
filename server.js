const express = require("express");
const mongojs = require("mongojs")
const logger = require("morgan");

const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const Workout = require("./models/WorkoutModel");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const databaseUrl = "workouts"
const collections = ["exercises"]

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("database error: ", error)
})

// HTML Routes

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});

// API routes

// Click "Fitness tracker"
// GET /api/workouts 404 1.959 ms - 151
// GET /api/workouts 404 1.072 ms - 151

// Click "Dashboard"
// GET /stats 304 1.543 ms - -
// GET /api/workouts/range 404 1.194 ms - 157

// Click "Add Exercise"
// PUT /api/workouts/undefined

// Click "Continue workout":
// POST /api/workouts 404 0.633 ms - 152


// Express - listening on localhost
app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
});