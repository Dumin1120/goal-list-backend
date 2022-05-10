const db = require("../db/dbconfig");
const { getAllTasksQuery, getOneTaskQuery, createTaskQuery, updateTasksQuery, deleteTasksQuery } = require("../helpers/buildTasksQueries");
const { updateCardFromTasksQuery } = require("../helpers/buildGoalCardsQueries");

const getAllTasks = async (taskObj) => {
    try {
        const query = getAllTasksQuery(taskObj);
        return await db.any(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

const getOneTask = async (taskObj) => {
    try {
        const query = getOneTaskQuery(taskObj);
        return await db.one(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

const createTask = async (taskObj) => {
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
}

const updateTasks = async (taskArrOrObj) => {
    try {
        const { uid } = Array.isArray(taskArrOrObj) ? taskArrOrObj[0] : taskArrOrObj;
        const query = updateTasksQuery(taskArrOrObj);
        const response = await db.many(query.str, query.values);
        const data = await updateCardFromTasks(uid, response[0]);
        if (data === "error") throw "error";
        return response;
    } catch (err) {
        return "error";
    }
}

const deleteTasks = async (taskObj, reqCardUpdate = true) => {
    try {
        const { uid } = taskObj;
        const query = deleteTasksQuery(taskObj);
        const response = await db.any(query.str, query.values);
        if (reqCardUpdate) {
            const data = await updateCardFromTasks(uid, response[0]);
            if (data === "error") throw "error";
        }
        return response;
    } catch (err) {
        return "error";
    }
}

const updateCardFromTasks = async (uid, taskResObj) => {
    try {
        const { card_id } = taskResObj;
        const data = await getAllTasks({ card_id, uid });
        if (data === "error") throw "error";
        const query = updateCardFromTasksQuery(card_id, uid, data);
        return await db.one(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

module.exports = {
    getAllTasks,
    getOneTask,
    createTask,
    updateTasks,
    deleteTasks
};
