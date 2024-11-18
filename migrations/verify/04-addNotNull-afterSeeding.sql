-- Verify oMyDog:04-addNotNull-afterSeeding on pg

BEGIN;

SELECT "department_label" FROM "user" WHERE "department_label" IS NULL;

ROLLBACK;
