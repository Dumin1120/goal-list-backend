const db = require("../db/dbconfig");

const getAllCardsInfo = async (card) => {
    try {
        const { uid } = card;
        return await db.any(
            `
            SELECT * FROM goal_cards
            WHERE uid=$1
            `,
            uid
        )
    } catch (err) {
        return "error";
    }
}

const getCardInfo = async (card) => {
    try {
        const { id, uid } = card;
        return await db.one(
            `
            SELECT * FROM goal_cards
            WHERE id=$1 AND uid=$2
            `,
            [id, uid]
        )
    } catch (err) {
        return "error";
    }
}

const createCardInfo = async (card) => {
    try {
        const { uid, card_name } = card;
        return await db.one(
            `
            INSERT INTO goal_cards
            (uid, card_name)
            VALUES
            ($1, $2)
            RETURNING *
            `,
            [uid, card_name]
        )
    } catch (err) {
        return "error";
    }
}

const updateCardInfo = async (card) => {
    try {
        const { id, uid, card_name } = card;
        return await db.one(
            `
            UPDATE goal_cards SET
            card_name=$1
            WHERE id=$2 AND uid=$3
            RETURNING *
            `,
            [card_name, id, uid]
        )
    } catch (err) {
        return "error";
    }
}

const deleteCardInfo = async (card) => {
    try {
        const { id, uid } = card;
        return await db.one(
            `
            DELETE FROM goal_cards
            WHERE id=$1 AND uid=$2
            RETURNING *
            `,
            [id, uid]
        )
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
