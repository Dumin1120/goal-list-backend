const users = require("express").Router();
const { getUserInfo, createUserInfo, updateUserInfo, deleteUserInfo } = require("../queries/users");
const { respondPayload, respondError, respondInvalidRequest } = require("../helpers/responses");

users.post("/", async (req, res) => {
    try {
        const payload = await getUserInfo(req.body);
        if (payload === "error")
            throw "Invalid user id";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

users.post("/modify", async (req, res) => {
    try {
        const payload = await createUserInfo(req.body);
        if (payload === "error")
            throw "Invalid data";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

users.put("/modify", async (req, res) => {
    try {
        const payload = await updateUserInfo(req.body);
        if (payload === "error")
            throw "Invalid data";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

users.delete("/modify", async (req, res) => {
    try {
        const payload = await deleteUserInfo(req.body);
        if (payload === "error")
            throw "Invalid user id";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

users.use("*", respondInvalidRequest);

module.exports = users;
