-- Verify oMyDog:03-addDepartmentColOnUser on pg

BEGIN;

SELECT "department_label" FROM "user" WHERE FALSE;

ROLLBACK;
