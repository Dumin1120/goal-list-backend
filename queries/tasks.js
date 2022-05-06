const db = require("../db/dbconfig");
const { getAllTasksQuery, getOneTaskQuery, createTaskQuery, updateTasksQuery, deleteTasksQuery } = require("../helpers/buildTasksQueries");

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
        const query = createTaskQuery(taskObj);
        return await db.one(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

const updateTasks = async (taskArrOrObj) => {
    try {
        const query = updateTasksQuery(taskArrOrObj);
        return await db.any(query.str, query.values);
    } catch (err) {
        return "error";
    }
}

const deleteTasks = async (taskObj) => {
    try {
        const query = deleteTasksQuery(taskObj);
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
