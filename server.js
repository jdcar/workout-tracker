const express = require("express");
const mongojs = require ("mongojs")
const logger = require("morgan");
const mongoose = require('mongoose')
// require in models


const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const databaseUrl = "Workout"
const collections = ["exercises"]

const db = mongojs(databaseUrl, collections);

mongoose.connect('mongodb://localhost/workout', { useNewUrlParser: true, useUnifieldTopology: true });



db.on("error", error => {
    console.log("database error: ", error)
})

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"));
});

// app.get("/exercise", (req, res) => {
//     res.send(exercise.html);
// });


app.get("/exercises", (req, res) => {
    // res.send(index.html);
    db.exercises.find({}, (error, found) => {
        if (error) {
          console.log(error);
        } else {
          res.json(found);
        }
      });
});

// app.get("/stats", (req, res) => {
//     res.send(stats.html);
// });

app.post("/workout", (req, res) => {
    console.log(req.body)
    db.Workout.insert(req.body)
})


app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
});