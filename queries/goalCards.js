const db = require("../db/dbconfig");
const { getAllCardsQuery, getCardQuery, createCardQuery, updateCardQuery, deleteCardQuery } = require("../helpers/buildGoalCardsQueries");

const getAllCardsInfo = async (cardObj) => {
    try {
        const query = getAllCardsQuery(cardObj);
        return await db.any(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

const getCardInfo = async (cardObj) => {
    try {
        const query = getCardQuery(cardObj);
        return await db.one(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

const createCardInfo = async (cardObj) => {
    try {
        const query = createCardQuery(cardObj);
        return await db.one(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

const updateCardInfo = async (cardObj) => {
    try {
        const query = updateCardQuery(cardObj);
        return await db.one(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

const deleteCardInfo = async (cardObj) => {
    try {
        const query = deleteCardQuery(cardObj);
        return await db.one(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

module.exports = {
    getAllCardsInfo,
    getCardInfo,
    createCardInfo,
    updateCardInfo,
    deleteCardInfo
};
