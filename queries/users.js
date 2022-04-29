const db = require("../db/dbconfig");

const getUserInfo = async (uid) => {
    try {
        return await db.one("SELECT * FROM users WHERE uid=$1", uid);
    } catch (err) {
        return "error";
    }
}

const createUserInfo = async (user) => {
    try {
        const { uid, name, dark_mode } = user;
        return await db.one(
            `
            INSERT INTO users
            (uid, name, dark_mode)
            VALUES
            ($1, $2, $3)
            RETURNING *
            `,
            [uid, name, dark_mode]
        )
    } catch (err) {
        return "error";
    }
}

const updateUserInfo = async (user) => {
    try {
        const { name, dark_mode, uid } = user;
        return await db.one(
            `
            UPDATE users SET
            name=$1, dark_mode=$2
            WHERE uid=$3
            RETURNING *
            `,
            [name, dark_mode, uid]
        )
    } catch (err) {
        return "error";
    }
}
const deleteUserInfo = async (uid) => {
    try {
        return await db.one(
            `
            DELETE FROM users
            WHERE uid=$1
            RETURNING *
            `,
            uid
        )
    } catch (err) {
        return "error";
    }
}

module.exports = {
    getUserInfo,
    createUserInfo,
    updateUserInfo,
    deleteUserInfo
};
