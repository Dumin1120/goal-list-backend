// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const usersController = require("./controllers/usersController");
const goalCardsController = require("./controllers/goalCardsController");
const tasksController = require("./controllers/tasksController");
const shareCardsController = require("./controllers/shareCardsController");
const shareTasksController = require("./controllers/shareTasksController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to Goal List App");
});

app.use("/users", usersController);
app.use("/goalcards", goalCardsController);
app.use("/tasks", tasksController);
app.use("/share/card", shareCardsController);
app.use("/share/tasks", shareTasksController);

// 404 Page
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
