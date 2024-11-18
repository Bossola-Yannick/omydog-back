-- Revert oMyDog:06-CRUD-functions from pg

BEGIN;

DROP FUNCTION IF EXISTS "delete_user" (int);
DROP FUNCTION IF EXISTS "update_user" (int, json);
DROP FUNCTION IF EXISTS "insert_user" (json);
DROP FUNCTION IF EXISTS "select_user_by_phone" (text);
DROP FUNCTION IF EXISTS "select_user_by_email" (text);
DROP FUNCTION IF EXISTS "select_user_by_pk" (int);
DROP FUNCTION IF EXISTS "delete_announcement_animal_type" (int);
DROP FUNCTION IF EXISTS "insert_announcement_animal_type" (int, text);
DROP FUNCTION IF EXISTS "delete_announcement" (int);
DROP FUNCTION IF EXISTS "update_announcement" (int, json);
DROP FUNCTION IF EXISTS "insert_announcement" (int, json);
DROP FUNCTION IF EXISTS "select_announcement_by_filters" (json);
DROP FUNCTION IF EXISTS "select_announcement_by_author" (int);
DROP FUNCTION IF EXISTS "select_announcement_by_pk" (int);

COMMIT;
