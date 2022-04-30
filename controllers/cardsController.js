const cards = require("express").Router();
const { getAllCardsInfo, getCardInfo, createCardInfo, updateCardInfo, deleteCardInfo } = require("../queries/cards");
const { respondPayload, respondError, respondInvalidRequest } = require("../helpers/responses");

cards.post("/", async (req, res) => {
    try {
        const payload = req.body.id
            ? await getCardInfo(req.body)
            : await getAllCardsInfo(req.body);
        if (payload === "error")
            throw "Invalid user id or card id";

        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

cards.post("/modify", async (req, res) => {
    try {
        const payload = await createCardInfo(req.body);
        if (payload === "error")
            throw "Invalid data";

        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

cards.put("/modify", async (req, res) => {
    try {
        const payload = await updateCardInfo(req.body);
        if (payload === "error")
            throw "Invalid data";

        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

cards.delete("/modify", async (req, res) => {
    try {
        const payload = await deleteCardInfo(req.body);
        if (payload === "error")
            throw "Invalid user id";

        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

cards.use("*", respondInvalidRequest);

module.exports = cards;
