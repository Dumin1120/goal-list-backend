const getAllCardsQuery = (cardObj) => {
    const str = `
        SELECT * FROM goal_cards
        WHERE uid=$1
        ORDER BY id ASC
        `;
    return { str, values: cardObj.uid };
}

const getCardQuery = (cardObj) => {
    const { id, uid } = cardObj;
    const str = `
        SELECT * FROM goal_cards
        WHERE uid=$1 AND id=$2
        `;
    const values = [uid, id];
    return { str, values };
}

const createCardQuery = (cardObj) => {
    const { uid, card_name } = cardObj;
    const str = `
        INSERT INTO goal_cards
        ( uid, card_name )
        VALUES
        ( $1, $2 )
        RETURNING *
        `;
    const values = [uid, card_name];
    return { str, values };
}

const updateCardQuery = (cardObj) => {
    const { tasks_total, id, uid } = cardObj;
    for (let i = tasks_total + 1; i < 6; i++) {
        cardObj[`task_${i}`] = "";
        cardObj[`task_${i}_completed`] = false;
    }
    const keyArr = [];
    const values = [];
    const keys = ["card_name", "tasks_completed", "tasks_total", "task_1", "task_1_completed", "task_2", "task_2_completed", "task_3", "task_3_completed", "task_4", "task_4_completed", "task_5", "task_5_completed"];
    keys.forEach(key => {
        if (cardObj.hasOwnProperty(key)) {
            values.push(cardObj[key]);
            keyArr.push(`${key}=$${values.length}`);
        }
    })
    const str = `
        UPDATE goal_cards SET
        ${keyArr.join(",")}
        WHERE uid=$${keyArr.length + 1} AND id=$${keyArr.length + 2}
        RETURNING *
        `;
    values.push(uid, id);
    return { str, values };
}

const updateCardFromTasksQuery = (id, uid, taskArr) => {
    let tasks_total = taskArr.length;
    let tasks_completed = 0;
    let cardObj = {};
    taskArr.forEach((obj, i) => {
        const { task, completed } = obj;
        if (i < 5) {
            cardObj[`task_${i + 1}`] = task;
            cardObj[`task_${i + 1}_completed`] = completed;
        }
        if (completed) {
            tasks_completed += 1;
        }
    })
    cardObj = { ...cardObj, id, uid, tasks_total, tasks_completed };
    return updateCardQuery(cardObj);
}

const deleteCardQuery = (cardObj) => {
    const { id, uid } = cardObj;
    const str = `
        DELETE FROM goal_cards
        WHERE uid=$1 AND id=$2
        RETURNING *
        `;
    const values = [uid, id];
    return { str, values };
}

module.exports = {
    getAllCardsQuery,
    getCardQuery,
    createCardQuery,
    updateCardQuery,
    updateCardFromTasksQuery,
    deleteCardQuery
};
