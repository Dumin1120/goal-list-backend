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
    card_name TEXT
);

CREATE TABLE todo_lists (
    id SERIAL PRIMARY KEY,
    todo TEXT,
    card_id INTEGER REFERENCES goal_cards (id) ON DELETE CASCADE
);

--  quantity INTEGER,
--  CHECK (quantity >= 0)