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
    card_name TEXT
);

DROP TABLE IF EXIST todo_lists CASCADE;
CREATE TABLE todo_list (
    id SERIAL PRIMARY KEY,
    todo TEXT,
    card_id INTEGER REFERENCES goal_cards (id) ON DELETE CASCADE
);
