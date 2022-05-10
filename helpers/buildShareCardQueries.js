const cardsColumnsStr = "id, card_name, share, share_edit, share_key, position, tasks_completed, tasks_total, task_1, task_1_completed, task_2, task_2_completed, task_3, task_3_completed, task_4, task_4_completed, task_5, task_5_completed";

const getShareCardQuery = (cardObj) => {
    const { share_key } = cardObj;
    const str = `
        SELECT ${cardsColumnsStr} FROM goal_cards
        WHERE share=TRUE AND share_key=$1
        `;
    const values = share_key;
    return { str, values };
}

const updateShareCardQuery = (cardObj) => {
    const { tasks_total, share_key } = cardObj;
    for (let i = tasks_total + 1; i < 6; i++) {
        cardObj[`task_${i}`] = "";
        cardObj[`task_${i}_completed`] = false;
    }
    const keyArr = [];
    const values = [];
    const keys = cardsColumnsStr.split(", ").filter(key => key !== "id" && key !== "share" && key !== "share_edit" && key !== "share_key");
    keys.forEach(key => {
        if (cardObj.hasOwnProperty(key)) {
            values.push(cardObj[key]);
            keyArr.push(`${key}=$${values.length}`);
        }
    })
    values.push(share_key);
    const str = `
        UPDATE goal_cards SET
        ${keyArr.join(",")}
        WHERE share=TRUE AND share_edit=TRUE AND share_key=$${values.length}
        RETURNING ${cardsColumnsStr}
        `;
    return { str, values };
}

const updateShareCardFromTasksQuery = (share_key, taskArr) => {
    const tasks_total = taskArr.length;
    let tasks_completed = 0;
    let cardObj = !taskArr.length ? {} : { ...taskArr[0] };
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
    cardObj = { ...cardObj, share_key, tasks_total, tasks_completed };
    return updateShareCardQuery(cardObj);
}

module.exports = {
    getShareCardQuery,
    updateShareCardQuery,
    updateShareCardFromTasksQuery
};
