-- Verify oMyDog:01-init-migration on pg

BEGIN;

SELECT *
FROM information_schema.domains
WHERE domain_name = 'email';

SELECT *
FROM information_schema.domains
WHERE domain_name = 'phone_number';

SELECT *
FROM "user", "announcement", "animal_type", "announcement_animal_type"
WHERE false;

ROLLBACK;
