const users = require("express").Router();
const { getUserInfo, createUserInfo, updateUserInfo, deleteUserInfo } = require("../queries/users");

users.post("/", async (req, res) => {
    try {
        const payload = await getUserInfo(req.body.uid);
        if (payload === "error")
            throw "Invalid user id";

        res.status(200).json({
            success: true,
            payload
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err
        });
    }
});

users.post("/modify", async (req, res) => {
    try {
        const payload = await createUserInfo(req.body);
        if (payload === "error")
            throw "Invalid data";

        res.status(200).json({
            success: true,
            payload
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err
        });
    }
});

users.put("/modify", async (req, res) => {
    try {
        const payload = await updateUserInfo(req.body);
        if (payload === "error")
            throw "Invalid data";

        res.status(200).json({
            success: true,
            payload
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err
        });
    }
});

users.delete("/modify", async (req, res) => {
    try {
        const payload = await deleteUserInfo(req.body.uid);
        if (payload === "error")
            throw "Invalid user id";

        res.status(200).json({
            success: true,
            payload
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err
        });
    }
});

const badRequest = (req, res) => {
    res.status(400).json({
        success: false,
        message: "Invalid request"
    });
};
users.get("*", badRequest);
users.post("*", badRequest);
users.put("*", badRequest);
users.delete("*", badRequest);

module.exports = users;
