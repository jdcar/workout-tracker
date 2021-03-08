const express = require("express");
const logger = require("morgan");
const mongoose = require('mongoose')
// require in models
const PORT = process.env.PORT || 3000;
// const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect('mongodb://localhost/', { useNewUrlParser: true, useUnifieldTopology: true });


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/", (req, res) => {
    res.send(index.html);
});

app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
});