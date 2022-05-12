const shareTasks = require("express").Router();
const { getShareTasks, createShareTask, updateShareTasks, deleteShareTask } = require("../queries/shareTasks");
const { respondPayload, respondError, respondInvalidRequest } = require("../helpers/responses");

shareTasks.get("/:share_key", async (req, res) => {
    try {
        const { share_key } = req.params;
        const payload = await getShareTasks({ share_key });
        if (payload === "error")
            throw "This goal card is private.";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
})

shareTasks.post("/", async (req, res) => {
    try {
        const payload = await createShareTask(req.body);
        if (payload === "error")
            throw "Access denied.";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
})

shareTasks.put("/", async (req, res) => {
    try {
        const payload = await updateShareTasks(req.body);
        if (payload === "error")
            throw "Access denied.";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

shareTasks.delete("/", async (req, res) => {
    try {
        const payload = await deleteShareTask(req.body);
        if (payload === "error")
            throw "Access denied.";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

shareTasks.use("*", respondInvalidRequest);

module.exports = shareTasks;
