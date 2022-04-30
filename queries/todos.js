const db = require("../db/dbconfig");

const getAllTodos = async (todo) => {
    try {
        const { card_id, uid } = todo;
        return await db.any(
            `
            SELECT * FROM todo_lists
            WHERE card_id=$1 AND uid=$2
            `,
            [card_id, uid]
        )
    } catch (err) {
        return "error";
    }
}

const getOneTodo = async (todo) => {
    try {
        const { id, uid } = todo;
        return await db.one(
            `
            SELECT * FROM todo_lists
            WHERE id=$1 AND uid=$2
            `,
            [id, uid]
        )
    } catch (err) {
        return "error";
    }
}

const createTodos = async (todo) => {
    try {
        const { uid, to_do, card_id } = todo;
        return await db.one(
            `
            INSERT INTO todo_lists
            (uid, to_do, card_id)
            VALUES
            ($1, $2, $3)
            RETURNING *
            `,
            [uid, to_do, card_id]
        )
    } catch (err) {
        return "error";
    }
}

const updateTodos = async (todo) => {
    try {
        const { id, uid, to_do } = todo;
        return await db.one(
            `
            UPDATE todo_lists SET
            to_do=$1
            WHERE id=$2 AND uid=$3
            RETURNING *
            `,
            [to_do, id, uid]
        )
    } catch (err) {
        return "error";
    }
}

const deleteTodos = async (todo) => {
    try {
        const { id, uid } = todo;
        return await db.one(
            `
            DELETE FROM todo_lists
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
    getAllTodos,
    getOneTodo,
    createTodos,
    updateTodos,
    deleteTodos
};
