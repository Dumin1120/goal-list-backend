// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const userController = require("./controllers/userController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to Goal List App");
});

app.use("/user", userController);

// 404 Page
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
