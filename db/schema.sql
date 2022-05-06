DROP DATABASE IF EXISTS goal_list_dev;
CREATE DATABASE goal_list_dev;
\c goal_list_dev;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uid TEXT,
    name TEXT,
    dark_mode BOOLEAN DEFAULT FALSE
);

CREATE TABLE goal_cards (
    id SERIAL PRIMARY KEY,
    uid TEXT,
    card_name TEXT,
    task_1 TEXT DEFAULT '',
    task_1_completed BOOLEAN DEFAULT FALSE,
    task_2 TEXT DEFAULT '',
    task_2_completed BOOLEAN DEFAULT FALSE,
    task_3 TEXT DEFAULT '',
    task_3_completed BOOLEAN DEFAULT FALSE,
    task_4 TEXT DEFAULT '',
    task_4_completed BOOLEAN DEFAULT FALSE,
    task_5 TEXT DEFAULT '',
    task_5_completed BOOLEAN DEFAULT FALSE,
    tasks_completed INTEGER DEFAULT 0,
    tasks_total INTEGER DEFAULT 0
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    uid TEXT,
    task TEXT,
    completed BOOLEAN DEFAULT FALSE,
    position INTEGER,
    card_id INTEGER REFERENCES goal_cards (id)
    ON DELETE CASCADE
);
