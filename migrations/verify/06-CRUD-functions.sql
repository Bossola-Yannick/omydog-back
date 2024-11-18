-- Verify oMyDog:06-CRUD-functions on pg

BEGIN;

SELECT *
FROM pg_proc
WHERE proname IN (
  'select_user_by_phone',
  'select_user_by_email',
  'select_user_by_pk',
  'select_announcement_by_filters',
  'select_announcement_by_author',
  'select_announcement_by_pk',
  'insert_announcement',
  'update_announcement',
  'delete_announcement',
  'insert_announcement_animal_type',
  'delete_announcement_animal_type',
  'insert_user',
  'update_user',
  'delete_user'
);

ROLLBACK;
