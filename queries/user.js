const db = require("../db/dbconfig");

const getUserInfo = async (uid) => {
    try {
        return await db.one("SELECT * FROM users WHERE uid=$1", uid);
    } catch (err) {
        return "error";
    }
}

module.exports = {
    getUserInfo
};
