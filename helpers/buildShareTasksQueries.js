const tasksColumnsStr = "id, task, completed, position, share, share_edit, share_key, card_name, card_id";

const getShareTasksQuery = (taskObj) => {
    const { share_key } = taskObj;
    const str = `
        SELECT ${tasksColumnsStr} FROM tasks
        WHERE share=TRUE AND share_key=$1
        ORDER BY position ASC
        `;
    const values = share_key;
    return { str, values };
}

/*const createShareTaskQuery = (taskObj) => {
    const { card_id, card_name, task, position, share_key } = taskObj;
    const str = `
        INSERT INTO tasks
        ( uid, card_id, card_name, task, position, share_key )
        VALUES
        ( $1, $2, $3, $4, $5, $6 )
        RETURNING ${tasksColumnsStr}
        `;
    const values = [uid, card_id, card_name, task, position, share_key];
    return { str, values };
}*/

const updateShareTasksQuery = (taskArrOrObj) => {
    const keyArr = [];
    const values = [];
    let str = "";
    const keys = tasksColumnsStr.split(", ").filter(key => key !== "share" && key !== "share_edit" && key !== "card_id");
    if (Array.isArray(taskArrOrObj)) {
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
            ${keyArr.filter(key => key !== "share_key" && key !== "id").map(key => `${key}=t2.${key}`).join(",")}
            FROM (
                VALUES
                ${Array.from({ length: values.length / keyArr.length }, () => {
            return "(" + keyArr.map(_ => `$${++count}`).join(",") + ")";
        }).join(",")}
            ) as t2 (${keyArr.join(",")})
            WHERE t2.share_key=t.share_key AND t2.id=t.id AND t.share=TRUE AND t.share_edit=TRUE
            RETURNING ${tasksColumnsStr}
            `;
        return { str, values };
    }
    const { share_key, id } = taskArrOrObj;
    keys.filter(key => key !== "id" && key !== "share_key" && key !== "share" && key !== "share_edit" && key !== "card_id")
        .forEach(key => {
            if (taskArrOrObj.hasOwnProperty(key)) {
                values.push(taskArrOrObj[key]);
                keyArr.push(`${key}=$${values.length}`);
            }
        })
    str = `
        UPDATE tasks SET
        ${keyArr.join(",")}
        WHERE share_key=$${keyArr.length + 1} AND id=$${keyArr.length + 2} AND share=TRUE AND share_edit=TRUE 
        RETURNING ${tasksColumnsStr}
        `;
    values.push(share_key, id);
    return { str, values };
}

const updateShareTasksFromCardQuery = (cardResObj) => {
    const { share_key, id, card_name } = cardResObj;
    const str = `
        UPDATE tasks SET
        card_name=$1
        WHERE share=TRUE AND share_key=$2 AND card_id=$3
        RETURNING ${tasksColumnsStr}
        `;
    const values = [card_name, share_key, id];
    return { str, values };
}

const deleteShareTaskQuery = (taskObj) => {
    const { id, share_key, } = taskObj;
    const str = `
        DELETE FROM tasks
        WHERE share=TRUE AND share_edit=TRUE AND share_key=$1 AND id=$2
        RETURNING ${tasksColumnsStr}
        `;
    const values = [share_key, id];
    return { str, values };
}

module.exports = {
    getShareTasksQuery,
    updateShareTasksQuery,
    updateShareTasksFromCardQuery,
    deleteShareTaskQuery
};
