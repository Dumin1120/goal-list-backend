\c goal_list_dev;

INSERT INTO users
( uid, name, dark_mode )
VALUES
( 'abcdefgh', 'Guest', false );

INSERT INTO goal_cards
( uid, card_name )
VALUES
( 'abcdefgh', 'New Goal'),
( 'abcdefgh', 'Goal 2'),
( 'abcdefgh', 'Another');

INSERT INTO todo_lists
( todo, card_id )
VALUES
( 'Finish question 1', 1),
( 'Finish question 2', 1),
( 'Finish question 3', 2),
( 'Finish question 4', 2),
( 'Finish question 5', 2),
( 'Finish question 6', 3),
( 'Finish question 7', 3);
