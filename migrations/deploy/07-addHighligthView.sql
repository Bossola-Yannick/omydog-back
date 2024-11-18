-- Deploy oMyDog:07-addHighligthView to pg

BEGIN;

CREATE VIEW "announcement_highlight" AS
  SELECT 
    "announcement"."id" AS "announcement_id", 
    "announcement"."date_start", 
    "announcement"."date_end", 
    "user"."id" as "user_id", 
    "user"."firstname", 
    "user"."lastname", 
    "user"."city", 
    "user"."url_img",
    ARRAY_AGG("animal_type"."label") AS animal_label
  FROM 
    "announcement"
  JOIN 
    "user" ON "announcement"."user_id" = "user"."id"
  JOIN 
    "announcement_animal_type" ON "announcement"."id" = "announcement_animal_type"."announcement_id"
  JOIN 
    "animal_type" ON "announcement_animal_type"."animal_type_id" = "animal_type"."id"
  GROUP BY 
    "announcement"."id",
    "user"."id"
  ORDER BY RANDOM()
  LIMIT 8;

COMMIT;
