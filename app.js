// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to Goal List App");
});

// EXPORT
module.exports = app;
