const cards = require("express").Router();
const { getAllCardsInfo, getCardInfo, createCardInfo, updateCardInfo, deleteCardInfo } = require("../queries/cards");

cards.post("/", async (req, res) => {
    try {
        const { cardId, uid } = req.body;
        const payload = cardId
            ? await getCardInfo(cardId, uid)
            : await getAllCardsInfo(uid);
        if (payload === "error")
            throw "Invalid user id or card id";

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

cards.post("/modify", async (req, res) => {
    try {
        const payload = await createCardInfo(req.body);
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
cards.put("/modify", async (req, res) => {
    try {
        const payload = await updateCardInfo(req.body);
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
cards.delete("/modify", async (req, res) => {
    try {
        const { cardId, uid } = req.body;
        const payload = await deleteCardInfo(cardId, uid);
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

module.exports = cards;
