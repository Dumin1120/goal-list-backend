const goalCards = require("express").Router();
const { getAllCards, getCard, createCard, updateCard, deleteCard } = require("../queries/goalCards");
const { respondPayload, respondError, respondInvalidRequest } = require("../helpers/responses");

goalCards.post("/", async (req, res) => {
    try {
        const payload = req.body.id
            ? await getCard(req.body)
            : await getAllCards(req.body);
        if (payload === "error")
            throw "Invalid user id or card id";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

goalCards.post("/modify", async (req, res) => {
    try {
        const payload = await createCard(req.body);
        if (payload === "error")
            throw "Invalid data";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

goalCards.put("/modify", async (req, res) => {
    try {
        const payload = await updateCard(req.body);
        if (payload === "error")
            throw "Invalid data";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

goalCards.delete("/modify", async (req, res) => {
    try {
        const payload = await deleteCard(req.body);
        if (payload === "error")
            throw "Invalid user id";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

goalCards.use("*", respondInvalidRequest);

module.exports = goalCards;
