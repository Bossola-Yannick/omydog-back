-- Revert oMyDog:04-addNotNull-afterSeeding from pg

BEGIN;

ALTER TABLE "user" ALTER COLUMN "department_label" DROP NOT NULL;

COMMIT;
