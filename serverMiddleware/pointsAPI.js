//Import express package
const express = require('express');

const app = express();
app.use(express.json());

// Define getPoints EndPoint
app.get('/getPoints', async(req, res) => {
    var pointsJsonFile = require("../assets/points.json");
    res.json(pointsJsonFile);
});

module.exports = app