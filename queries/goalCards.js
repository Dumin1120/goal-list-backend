const db = require("../db/dbconfig");
const { getAllCardsQuery, getCardQuery, createCardQuery, updateCardQuery, deleteCardQuery } = require("../helpers/buildGoalCardsQueries");
const { updateTasksFromCardQuery } = require("../helpers/buildTasksQueries");
const { deleteTasks } = require("./tasks");

const getAllCards = async (cardObj) => {
    try {
        const query = getAllCardsQuery(cardObj);
        return await db.any(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

const getCard = async (cardObj) => {
    try {
        const query = getCardQuery(cardObj);
        return await db.one(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

const createCard = async (cardObj) => {
    try {
        const query = createCardQuery(cardObj);
        return await db.one(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

const updateCard = async (cardObj) => {
    try {
        const { uid, card_name, share, share_edit } = cardObj;
        const query = updateCardQuery(cardObj);
        const response = await db.one(query.str, query.values);
        if (card_name || share !== undefined || share_edit !== undefined) {
            await updateTasksFromCard(uid, response);
        }
        return response;
    } catch (err) {
        return "error";
    }
}

const deleteCard = async (cardObj) => {
    try {
        const { uid, id } = cardObj;
        await deleteTasks({ uid, card_id: id }, false);
        const query = deleteCardQuery(cardObj);
        return await db.one(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

const updateTasksFromCard = async (uid, cardResObj) => {
    try {
        const query = updateTasksFromCardQuery(uid, cardResObj);
        return await db.any(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

module.exports = {
    getAllCards,
    getCard,
    createCard,
    updateCard,
    deleteCard
};
