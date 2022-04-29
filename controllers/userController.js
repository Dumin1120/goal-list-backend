const user = require("express").Router();
const { getUserInfo } = require("../queries/user");

user.post("/", async (req, res) => {
    try {
        const userInfo = await getUserInfo(req.body.uid);
        if (userInfo === "error")
            throw "Invalid user id";

        res.status(200).json({
            success: true,
            payload: userInfo,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err
        });
    }
});

user.post("/modify", async (req, res) => {

});

user.put("/modify", async (req, res) => {

});

user.delete("/modify", async (req, res) => {

});

const badRequest = (req, res) => {
    res.status(400).json({
        success: false,
        message: "Invalid request"
    });
};
user.get("/", badRequest);
user.put("/", badRequest);
user.delete("/", badRequest);
user.get("/modify", badRequest);

module.exports = user;
