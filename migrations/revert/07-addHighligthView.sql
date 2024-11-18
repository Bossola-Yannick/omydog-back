-- Revert oMyDog:07-addHighligthView from pg

BEGIN;

DROP VIEW "announcement_highlight";

COMMIT;
