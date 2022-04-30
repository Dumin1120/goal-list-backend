const todos = require("express").Router();
const { getAllTodos, getOneTodo, createTodos, updateTodos, deleteTodos } = require("../queries/todos");
const { respondPayload, respondError, respondInvalidRequest } = require("../helpers/responses");

todos.post("/", async (req, res) => {
    try {
        const payload = typeof req.body.id === "number"
            ? await getOneTodo(req.body)
            : await getAllTodos(req.body);
        if (payload === "error")
            throw "Invalid user id or card id";

        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

todos.post("/modify", async (req, res) => {
    try {
        const payload = await createTodos(req.body);
        if (payload === "error")
            throw "Invalid data";

        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

todos.put("/modify", async (req, res) => {
    try {
        const payload = await updateTodos(req.body);
        if (payload === "error")
            throw "Invalid data";

        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

todos.delete("/modify", async (req, res) => {
    try {
        const payload = await deleteTodos(req.body);
        if (payload === "error")
            throw "Invalid data";

        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

todos.use("*", respondInvalidRequest);

module.exports = todos;
