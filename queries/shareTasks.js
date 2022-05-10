const db = require("../db/dbconfig");
const { getShareTasksQuery, updateShareTasksQuery, deleteShareTaskQuery } = require("../helpers/buildShareTasksQueries");
const { updateShareCardFromTasksQuery } = require("../helpers/buildShareCardQueries");

const getShareTasks = async (taskObj) => {
    try {
        const query = getShareTasksQuery(taskObj);
        return await db.any(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

/*const createShareTask = async (taskObj) => {
    try {
        const { uid } = taskObj;
        const query = createTaskQuery(taskObj);
        const response = await db.one(query.str, query.values);
        const data = await updateCardFromTasks(uid, response);
        if (data === "error") throw "error";
        return response;
    } catch (err) {
        return "error";
    }
}*/

const updateShareTasks = async (taskArrOrObj) => {
    try {
        const { share_key } = Array.isArray(taskArrOrObj) ? taskArrOrObj[0] : taskArrOrObj;
        const query = updateShareTasksQuery(taskArrOrObj);
        const response = await db.many(query.str, query.values);
        const data = await updateShareCardFromTasks(share_key);
        if (data === "error") throw "error";
        return response;
    } catch (err) {
        return "error";
    }
}

const deleteShareTask = async (taskObj, reqCardUpdate = true) => {
    try {
        const { share_key } = taskObj;
        const query = deleteShareTaskQuery(taskObj);
        const response = await db.any(query.str, query.values);
        if (reqCardUpdate) {
            const data = await updateShareCardFromTasks(share_key);
            if (data === "error") throw "error";
        }
        return response;
    } catch (err) {
        return "error";
    }
}

const updateShareCardFromTasks = async (share_key) => {
    try {
        const data = await getShareTasks({ share_key });
        if (data === "error") throw "error";
        const query = updateShareCardFromTasksQuery(share_key, data);
        return await db.one(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

module.exports = {
    getShareTasks,
    updateShareTasks,
    deleteShareTask
};
