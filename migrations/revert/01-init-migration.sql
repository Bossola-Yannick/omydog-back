-- Revert oMyDog:01-init-migration from pg

BEGIN;

DROP TABLE "announcement_animal_type";
DROP TABLE "animal_type";
DROP TABLE "announcement";
DROP TABLE "user";
DROP DOMAIN "phone_number";
DROP DOMAIN "email";

COMMIT;
