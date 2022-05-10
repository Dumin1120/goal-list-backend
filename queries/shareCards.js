const db = require("../db/dbconfig");
const { getShareCardQuery, updateShareCardQuery } = require("../helpers/buildShareCardQueries");
const { updateShareTasksFromCardQuery } = require("../helpers/buildShareTasksQueries");

const getShareCard = async (cardObj) => {
    try {
        const query = getShareCardQuery(cardObj);
        return await db.one(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

const updateShareCard = async (cardObj) => {
    try {
        const query = updateShareCardQuery(cardObj);
        const response = await db.one(query.str, query.values);
        if (cardObj.card_name) {
            await updateShareTasksFromCard(response);
        }
        return response;
    } catch (err) {
        return "error";
    }
}

const updateShareTasksFromCard = async (cardResObj) => {
    try {
        const query = updateShareTasksFromCardQuery(cardResObj);
        return await db.any(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

module.exports = {
    getShareCard,
    updateShareCard
};
