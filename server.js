const express = require("express");
const mongojs = require("mongojs")
const logger = require("morgan");

const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const Exercise = require("./models/WorkoutModel");

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

app.get("/api/workouts", (req, res) => {
    db.exercises.find({}, (err, result) => {
        if (err) throw err
        res.json(result)
    })
})

// Click "Dashboard"
app.get("/api/workouts/range", (req, res) => {
    db.exercises.find({}, (err, result) => {
        if (err) throw err
        res.json(result)
    })
})



app.get("/api/workouts/:id", (req, res) => {
    db.exercises.findOne(
        {
            _id: mongojs.ObjectId(req.params.id)
        },
        (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        }
    );
});
// Click "Add Exercise"
// PUT /api/workouts/undefined
// app.put("/api/workouts/:id", (req, res) => {
//     const id = req.params.id
//     console.log(id)
//     // db.exercises.find({ _id: mongojs.ObjectId(id)}, (err, result) => {
//     //     if (err) throw err 
//     //     res.json(result)
//     // })
// })

// POST /api/workouts 404 0.633 ms - 152T
// This creates a workout ID 
app.post("/api/workouts/", (req, res) => {
    // Right now this adds a blank exercise
    // console.log(req.body)
    db.exercises.insert(req.body, (err, result) => {
        if (err) throw err
        console.log(result)
    })
})


app.put("/api/workouts/:id", (req, res) => {
    console.log(req.params.id)
    db.exercises.updateOne(
        {
            _id: mongojs.ObjectId(req.params.id)
        },
        {
            $push: {
                // day: Date.now,
                exercises: 
                // [
                    {
                    type: req.body.type,
                    name: req.body.name,
                    duration: req.body.duration,
                    distance: req.body.distance,
                    weight: req.body.weight,
                    reps: req.body.reps,
                    sets: req.body.sets,
                }
            // ]
            }
        },
        (error, data) => {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        })


})


// Click NewWorkout
// GET /exercise

// Express - listening on localhost
app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
});