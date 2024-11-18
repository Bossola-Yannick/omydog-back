-- Revert oMyDog:03-addDepartmentColOnUser from pg

BEGIN;

ALTER TABLE "user" 
DROP COLUMN "department_label";

COMMIT;
