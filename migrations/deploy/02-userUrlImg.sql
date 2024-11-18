-- Deploy oMyDog:02-userUrlImg to pg

BEGIN;

ALTER TABLE "user"
ADD COLUMN "url_img" text,
ADD CONSTRAINT url_img_check CHECK (url_img ~ '^http:\/\/res\.cloudinary\.com\/dfniqh3lp\/image\/upload\/.*\.jpg$');

COMMIT;