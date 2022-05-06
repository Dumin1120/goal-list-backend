\c goal_list_dev;

INSERT INTO users
( uid, name, dark_mode )
VALUES
( 'aabbcc', 'Guest', false );

INSERT INTO goal_cards
( uid, card_name, task_1, task_1_completed, task_2, task_2_completed, task_3, task_3_completed, task_4, task_4_completed, task_5, task_5_completed, tasks_completed, tasks_total )
VALUES
( 'aabbcc', 'Goal 1 - 3 tasks', 'Finish question 1', true, 'Finish question 2', false, 'Finish question 3', false, '', false, '', false, 2, 3 ),
( 'aabbcc', 'Goal 2 - 5 tasks', 'Finish question 4', false, 'Finish question 5', true, 'Finish question 6', false, 'Finish question 7', false, 'Finish question 8', true, 2, 5 ),
( 'aabbcc', 'Goal 3 - 7 tasks', 'Finish question 9', true, 'Finish question 10', true, 'Finish question 11', false, 'Finish question 12', false, 'Finish question 13', false, 3, 7 );

INSERT INTO tasks
( uid, task, completed, position, card_id )
VALUES
( 'aabbcc', 'Finish question 1', true, 1, 1 ),
( 'aabbcc', 'Finish question 2', false, 2, 1 ),
( 'aabbcc', 'Finish question 3', false, 3, 1 ),
( 'aabbcc', 'Finish question 4', false, 1, 2 ),
( 'aabbcc', 'Finish question 5', true, 2, 2 ),
( 'aabbcc', 'Finish question 6', false, 3, 2 ),
( 'aabbcc', 'Finish question 7', false, 4, 2 ),
( 'aabbcc', 'Finish question 8', true, 5, 2 ),
( 'aabbcc', 'Finish question 9', true, 1, 3 ),
( 'aabbcc', 'Finish question 10', true, 2, 3 ),
( 'aabbcc', 'Finish question 11', false, 3, 3 ),
( 'aabbcc', 'Finish question 12', false, 4, 3 ),
( 'aabbcc', 'Finish question 13', false, 5, 3 ),
( 'aabbcc', 'Finish question 14', true, 6, 3 ),
( 'aabbcc', 'Finish question 15', false, 7, 3 );
