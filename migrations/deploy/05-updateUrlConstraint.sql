-- Deploy oMyDog:05-updateUrlConstraint to pg

BEGIN;

ALTER TABLE "user" 
DROP CONSTRAINT url_img_check;

ALTER TABLE "user"
ADD CONSTRAINT url_img_check CHECK (url_img ~ '^http:\/\/res\.cloudinary\.com\/dfniqh3lp\/image\/upload\/.*\.(png|jpg|jpeg)$');


COMMIT;
