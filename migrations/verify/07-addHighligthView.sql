-- Verify oMyDog:07-addHighligthView on pg

BEGIN;

SELECT * FROM "announcement_highlight" WHERE false;

ROLLBACK;
