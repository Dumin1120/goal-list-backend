const tasksColumnsStr = "id, task, completed, position, share, share_edit, share_key, card_name, card_id";

const getAllTasksQuery = (taskObj) => {
    const { uid, card_id } = taskObj;
    const str = `
        SELECT ${tasksColumnsStr} FROM tasks
        WHERE uid=$1 AND card_id=$2
        ORDER BY position ASC
        `;
    const values = [uid, card_id];
    return { str, values };
}

const getOneTaskQuery = (taskObj) => {
    const { uid, id } = taskObj;
    const str = `
        SELECT ${tasksColumnsStr} FROM tasks
        WHERE uid=$1 AND id=$2
        `;
    const values = [uid, id];
    return { str, values };
}

const createTaskQuery = (taskObj) => {
    const { uid, card_id, card_name, task, position, share, share_edit, share_key } = taskObj;
    const str = `
        INSERT INTO tasks
        ( uid, card_id, card_name, task, position, share, share_edit, share_key )
        VALUES
        ( $1, $2, $3, $4, $5, $6, $7, $8 )
        RETURNING ${tasksColumnsStr}
        `;
    const values = [uid, card_id, card_name, task, position, share || false, share_edit || false, share_key];
    return { str, values };
}

const updateTasksQuery = (taskArrOrObj) => {
    const keyArr = [];
    const values = [];
    let str = "";
    const keys = tasksColumnsStr.split(", ").filter(key => key !== "share_key");
    if (Array.isArray(taskArrOrObj)) {
        keyArr.push("uid");
        keys.forEach(key => {
            if (taskArrOrObj[0].hasOwnProperty(key)) {
                keyArr.push(key);
            }
        })
        taskArrOrObj.forEach(task => {
            keyArr.forEach(key => values.push(task[key]));
        })
        let count = 0;
        str = `
            UPDATE tasks as t SET
            ${keyArr.slice(2).map(key => `${key}=t2.${key}`).join(",")}
            FROM (
                VALUES
                ${Array.from({ length: values.length / keyArr.length }, () => {
            return "(" + keyArr.map(_ => `$${++count}`).join(",") + ")";
        }).join(",")}
            ) as t2 (${keyArr.join(",")})
            WHERE t2.uid = t.uid AND t2.id = t.id
            RETURNING ${tasksColumnsStr}
            `;
        return { str, values };
    }
    const { uid, id } = taskArrOrObj;
    keys.slice(1).forEach(key => {
        if (taskArrOrObj.hasOwnProperty(key)) {
            values.push(taskArrOrObj[key]);
            keyArr.push(`${key}=$${values.length}`);
        }
    })
    str = `
        UPDATE tasks SET
        ${keyArr.join(",")}
        WHERE uid=$${keyArr.length + 1} AND id=$${keyArr.length + 2}
        RETURNING ${tasksColumnsStr}
        `;
    values.push(uid, id);
    return { str, values };
}

const updateTasksFromCardQuery = (uid, cardResObj) => {
    const { id, card_name, share, share_edit } = cardResObj;
    const str = `
        UPDATE tasks SET
        card_name=$1, share=$2, share_edit=$3
        WHERE uid=$4 AND card_id=$5
        RETURNING ${tasksColumnsStr}
        `;
    const values = [card_name, share, share_edit, uid, id];
    return { str, values };
}

const deleteTasksQuery = (taskObj) => {
    const { id, card_id, uid } = taskObj;
    const str = `
        DELETE FROM tasks
        WHERE uid=$1 AND ${card_id ? "card_id" : "id"}=$2
        RETURNING ${tasksColumnsStr}
        `;
    const values = [uid, card_id || id];
    return { str, values };
}

module.exports = {
    getAllTasksQuery,
    getOneTaskQuery,
    createTaskQuery,
    updateTasksQuery,
    updateTasksFromCardQuery,
    deleteTasksQuery
};
