const tasks = require("express").Router();
const { getAllTasks, getOneTask, createTask, updateTasks, deleteTasks } = require("../queries/tasks");
const { respondPayload, respondError, respondInvalidRequest } = require("../helpers/responses");

tasks.post("/", async (req, res) => {
    try {
        const payload = typeof req.body.id === "number"
            ? await getOneTask(req.body)
            : await getAllTasks(req.body);
        if (payload === "error")
            throw "Invalid user id or card id";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

tasks.post("/modify", async (req, res) => {
    try {
        const payload = await createTask(req.body);
        if (payload === "error")
            throw "Invalid data";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

tasks.put("/modify", async (req, res) => {
    try {
        const payload = await updateTasks(req.body);
        if (payload === "error")
            throw "Invalid data";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

tasks.delete("/modify", async (req, res) => {
    try {
        const payload = await deleteTasks(req.body);
        if (payload === "error")
            throw "Invalid data";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

tasks.use("*", respondInvalidRequest);

module.exports = tasks;
