DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uid TEXT NOT NULL,
    name TEXT NOT NULL,
    dark_mode BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS goal_cards CASCADE;
CREATE TABLE goal_cards (
    id SERIAL PRIMARY KEY,
    uid TEXT NOT NULL,
    card_name TEXT NOT NULL,
    share BOOLEAN DEFAULT FALSE,
    share_edit BOOLEAN DEFAULT FALSE,
    share_key TEXT NOT NULL,
    position INTEGER,
    tasks_completed INTEGER DEFAULT 0,
    tasks_total INTEGER DEFAULT 0,
    task_1 TEXT DEFAULT '',
    task_1_completed BOOLEAN DEFAULT FALSE,
    task_2 TEXT DEFAULT '',
    task_2_completed BOOLEAN DEFAULT FALSE,
    task_3 TEXT DEFAULT '',
    task_3_completed BOOLEAN DEFAULT FALSE,
    task_4 TEXT DEFAULT '',
    task_4_completed BOOLEAN DEFAULT FALSE,
    task_5 TEXT DEFAULT '',
    task_5_completed BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS tasks CASCADE;
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    uid TEXT NOT NULL,
    task TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    position INTEGER,
    share BOOLEAN DEFAULT FALSE,
    share_edit BOOLEAN DEFAULT FALSE,
    share_key TEXT NOT NULL,
    card_name TEXT NOT NULL,
    card_id INTEGER NOT NULL REFERENCES goal_cards (id)
    ON DELETE CASCADE
);
