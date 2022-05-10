const shareCards = require("express").Router();
const { getShareCard, updateShareCard } = require("../queries/shareCards");
const { respondPayload, respondError, respondInvalidRequest } = require("../helpers/responses");

shareCards.get("/:share_key", async (req, res) => {
    try {
        const { share_key } = req.params;
        const payload = await getShareCard({ share_key });
        if (payload === "error")
            throw "Access denied.";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
})

shareCards.put("/:share_key", async (req, res) => {
    try {
        const { share_key } = req.params;
        const payload = await updateShareCard({ ...req.body, share_key });
        if (payload === "error")
            throw "Access denied.";
        res.status(200).json(respondPayload(payload));
    } catch (err) {
        res.status(400).json(respondError(err));
    }
});

shareCards.use("*", respondInvalidRequest);

module.exports = shareCards;
