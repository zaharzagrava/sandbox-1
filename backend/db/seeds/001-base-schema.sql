insert into client(
    client_name,
    email,
    client_password,
    confirmed_at,
    firebase_id,
    "createdAt",
    "updatedAt"
  )
VALUES (
    'UTest',
    'test@utest.com',
    123123,
    null,
    null,
    '2020-10-08',
    '2020-10-08'
  );
insert into client(
    client_name,
    email,
    client_password,
    confirmed_at,
    firebase_id,
    "createdAt",
    "updatedAt"
  )
VALUES (
    'UTest2',
    'test2@utest.com',
    123123,
    null,
    null,
    '2020-10-08',
    '2020-10-08'
  );
--
-- Test task data
--
insert into task(
    title,
    task_description,
    is_done,
    task_priority,
    due_date,
    "createdAt",
    "updatedAt"
  )
VALUES (
    'First Task',
    'Description of the first task',
    false,
    1,
    '2020-10-15',
    '2020-10-08',
    '2020-10-08'
  );
insert into task(
    title,
    task_description,
    is_done,
    task_priority,
    due_date,
    "createdAt",
    "updatedAt"
  )
VALUES (
    'Second Task',
    'Description of the second task',
    false,
    2,
    '2020-10-15',
    '2020-10-08',
    '2020-10-08'
  );
insert into task(
    title,
    task_description,
    is_done,
    task_priority,
    due_date,
    "createdAt",
    "updatedAt"
  )
VALUES (
    'Third Task',
    'Description of the third task',
    false,
    3,
    '2020-10-15',
    '2020-10-08',
    '2020-10-08'
  );
--
-- Test client_task data
--
insert into client_task(client_id, task_id, "createdAt", "updatedAt")
values (1, 1, '2020-10-08', '2020-10-08');
insert into client_task(client_id, task_id, "createdAt", "updatedAt")
values (1, 2, '2020-10-08', '2020-10-08');
insert into client_task(client_id, task_id, "createdAt", "updatedAt")
values (2, 3, '2020-10-08', '2020-10-08');