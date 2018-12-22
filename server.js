const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/beerRoutes");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)

app.use(express.static("client/build"));

// Add routes to our API
app.use("/api", routes);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", 'index.html'));
});

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://heroku_dg5vhjf3:h51s6fefbtsv25am0kumj9pbou@ds041377.mlab.com:41377/heroku_dg5vhjf3");

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
