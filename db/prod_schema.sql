DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uid TEXT,
    name TEXT,
    dark_mode BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXIST goal_cards CASCADE;
CREATE TABLE goal_cards (
    id SERIAL PRIMARY KEY,
    uid TEXT,
    card_name TEXT,
    task_1 TEXT,
    task_1_completed BOOLEAN,
    task_2 TEXT,
    task_2_completed BOOLEAN,
    task_3 TEXT,
    task_3_completed BOOLEAN,
    task_4 TEXT,
    task_4_completed BOOLEAN,
    task_5 TEXT,
    task_5_completed BOOLEAN,
    tasks_completed INTEGER,
    tasks_total INTEGER
);

DROP TABLE IF EXIST tasks CASCADE;
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    uid TEXT,
    task TEXT,
    completed BOOLEAN,
    position INTEGER,
    card_id INTEGER REFERENCES goal_cards (id)
    ON DELETE CASCADE
);
