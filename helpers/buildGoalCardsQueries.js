const getAllCardsQuery = (cardObj) => {
    const str = `
        SELECT * FROM goal_cards
        WHERE uid=$1
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
    keys.forEach(k => {
        if (cardObj.hasOwnProperty(k)) {
            values.push(cardObj[k]);
            keyArr.push(`${k}=$${values.length}`);
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
    deleteCardQuery
};
