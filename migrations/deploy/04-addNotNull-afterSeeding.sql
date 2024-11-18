-- Deploy oMyDog:04-addNotNull-afterSeeding to pg

BEGIN;

ALTER TABLE "user" ALTER COLUMN "department_label" SET NOT NULL;

COMMIT;
