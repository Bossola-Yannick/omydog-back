-- Revert oMyDog:02-userUrlImg from pg

BEGIN;

ALTER TABLE "user"
DROP CONSTRAINT IF EXISTS url_img_check,
DROP COLUMN "url_img";

COMMIT;
