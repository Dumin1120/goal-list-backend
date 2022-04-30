// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const usersController = require("./controllers/usersController");
const cardsController = require("./controllers/cardsController");
const todosController = require("./controllers/todosController");

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
app.use("/cards", cardsController);
app.use("/todos", todosController);

// 404 Page
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
