-- Deploy oMyDog:06-CRUD-functions to pg

BEGIN;

CREATE FUNCTION "select_announcement_by_pk" (input_id int) RETURNS JSON AS $$

  SELECT
    json_build_object(
      'id', "announcement"."id",
      'date_start', "announcement"."date_start",
      'date_end', "announcement"."date_end",
      'mobility', "announcement"."mobility",
      'home', "announcement"."home",
      'description', "announcement"."description",
      'firstname', "user"."firstname",
      'lastname', "user"."lastname",
      'city', "user"."city",
      'phone_number', "user"."phone_number",
      'email', "user"."email",
      'url_img', "user"."url_img",
      'animal_label', ARRAY_AGG("animal_type"."label")
    )
  FROM
    "announcement"
  JOIN
    "user" ON "announcement"."user_id" = "user"."id"
  LEFT JOIN
    "announcement_animal_type" ON "announcement_animal_type"."announcement_id" = "announcement"."id"
  LEFT JOIN
    "animal_type" ON "animal_type"."id" = "announcement_animal_type"."animal_type_id"
  WHERE
    "announcement"."id" = $1::int
  GROUP BY
    "announcement"."id",
    "user"."firstname",
    "user"."lastname",
    "user"."city",
    "user"."phone_number",
    "user"."email",
    "user"."url_img";

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION "select_announcement_by_author" (input_id int) RETURNS JSON AS $$

  SELECT 
    COALESCE(
      json_agg(
        json_build_object(
          'id', "announcement"."id",
          'date_start', "announcement"."date_start",
          'date_end', "announcement"."date_end",
          'mobility', "announcement"."mobility",
          'home', "announcement"."home",
          'description', "announcement"."description",
          'animal_label',(
            SELECT ARRAY_AGG("animal_type"."label")
            FROM "animal_type"
            JOIN "announcement_animal_type" ON "announcement_animal_type"."animal_type_id" = "animal_type"."id"
            WHERE "announcement_animal_type"."announcement_id" = "announcement"."id"
          )
        )
      ), '[]'::json
    )
  FROM 
    "announcement"
  WHERE 
    "announcement"."user_id" = $1::int;

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION "select_announcement_by_filters" (input json) RETURNS JSON AS $$

  SELECT
    COALESCE(
      json_agg(
        json_build_object(
          'id', "announcement"."id",
          'date_start', "announcement"."date_start",
          'date_end', "announcement"."date_end",
          'mobility', "announcement"."mobility",
          'home', "announcement"."home",
          'description', "announcement"."description",
          'firstname', "user"."firstname",
          'lastname', "user"."lastname",
          'city', "user"."city",
          'url_img', "user"."url_img",
          'animal_label', (
            SELECT ARRAY_AGG("animal_type"."label")
            FROM "animal_type"
            JOIN "announcement_animal_type" ON "announcement_animal_type"."animal_type_id" = "animal_type"."id"
            WHERE "announcement_animal_type"."announcement_id" = "announcement"."id"
          )
        )
      ), '[]'::json
    )
  FROM 
    "announcement"
  JOIN 
    "user" ON "announcement"."user_id" = "user"."id"
  WHERE 
    "user"."department_label" = ($1->>'department_label')::text
    AND ($1->>'date_start')::date >= "announcement"."date_start"
    AND ($1->>'date_end')::date <= "announcement"."date_end"
    AND EXISTS (
      SELECT *
      FROM "announcement_animal_type"
      JOIN "animal_type" ON "animal_type"."id" = "announcement_animal_type"."animal_type_id"
      WHERE "announcement_animal_type"."announcement_id" = "announcement"."id"
      AND "animal_type"."label" = ($1->>'animal_label')::text
    );

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION "insert_announcement" (input_id int, input json) RETURNS JSON AS $$

  INSERT INTO "announcement" (
    "date_start",
    "date_end",
    "mobility",
    "home",
    "description",
    "user_id"
  ) VALUES (
    ($2->>'date_start')::date,
    ($2->>'date_end')::date,
    ($2->>'mobility')::boolean,
    ($2->>'home')::boolean,
    ($2->>'description')::text,
    $1::int
  )
  RETURNING
    json_build_object(
      'id', "id"
    ) AS result;

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION "update_announcement" (input_id int, input json) RETURNS JSON AS $$

  UPDATE "announcement" SET
    "date_start" = COALESCE(($2->>'date_start')::date, "date_start"),
    "date_end" = COALESCE(($2->>'date_end')::date, "date_end"),
    "mobility" = COALESCE(($2->>'mobility')::boolean, "mobility"),
    "home" = COALESCE(($2->>'home')::boolean, "home"),
    "description" = COALESCE(($2->>'description')::text, "description"),
    "updated_at" = now()
  WHERE "id" = $1::int
  RETURNING
    json_build_object(
      'id', "id",
      'date_start', "date_start",
      'date_end', "date_end",
      'mobility', "mobility",
      'home', "home",
      'description', "description",
      'user_id', "user_id",
      'created_at', "created_at",
      'updated_at', "updated_at"
    );

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION "delete_announcement" (input_id int) RETURNS VOID AS $$

  DELETE FROM "announcement"
  WHERE "id" = $1::int;

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION "insert_announcement_animal_type" (input_id int, input text) RETURNS VOID AS $$

  INSERT INTO "announcement_animal_type" (
    "announcement_id",
    "animal_type_id"
  ) VALUES (
    $1::int,
    (
      SELECT "id"
      FROM "animal_type"
      WHERE "label" = $2::text
    )
  );

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION "delete_announcement_animal_type" (input_id int) RETURNS VOID AS $$

  DELETE  FROM "announcement_animal_type"
  WHERE "announcement_id" = $1::int;

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION "select_user_by_pk" (input_id int) RETURNS JSON AS $$

  SELECT
    json_build_object(
      'firstname', "firstname",
      'lastname', "lastname",
      'email', "email",
      'city', "city",
      'phone_number', "phone_number",
      'refresh_token', "refresh_token",
      'department_label', "department_label",
      'url_img', "url_img"
    )
  FROM "user"
  WHERE "id" = $1::int;

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION "select_user_by_email" (input text) RETURNS JSON AS $$

  SELECT
    json_build_object(
      'id', "id",
      'email', "email",
      'password', "password"
    )
  FROM "user"
  WHERE "email" = $1::text;

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION "select_user_by_phone" (input text) RETURNS BOOLEAN AS $$

  SELECT EXISTS (
    SELECT null
    FROM "user"
    WHERE "phone_number" = $1::text
  );

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION "insert_user" (input json) RETURNS VOID AS $$

  INSERT INTO "user" (
    "firstname",
    "lastname",
    "password",
    "email",
    "city",
    "phone_number",
    "department_label",
    "url_img"
  ) VALUES (
    ($1->>'firstname')::text,
    ($1->>'lastname')::text,
    ($1->>'password')::text,
    ($1->>'email')::text,
    ($1->>'city')::text,
    ($1->>'phone_number')::text,
    ($1->>'department_label')::text,
    ($1->>'url_img')::text
  );

$$ LANGUAGE SQL STRICT;

CREATE FUNCTION "update_user" (input_id int, input json) RETURNS VOID AS $$

  UPDATE "user" SET
    "firstname" = COALESCE(($2->>'firstname')::text, "firstname"),
    "lastname" = COALESCE(($2->>'lastname')::text, "lastname"),
    "password" = COALESCE(($2->>'password')::text, "password"),
    "email" = COALESCE(($2->>'email')::text, "email"),
    "city" = COALESCE(($2->>'city')::text, "city"),
    "phone_number" = COALESCE(($2->>'phone_number')::text, "phone_number"),
    "department_label" = COALESCE(($2->>'department_label')::text, "department_label"),
    "url_img" = COALESCE(($2->>'url_img')::text, "url_img"),
    "refresh_token" = COALESCE(($2->>'refresh_token')::text, "refresh_token"),
    "updated_at" = now()
  WHERE "id" = $1::int;

$$ LANGUAGE SQL STRICT; 

CREATE FUNCTION "delete_user" (input_id int) RETURNS VOID AS $$

  DELETE FROM "user"
  WHERE "id" = $1::int;

$$ LANGUAGE SQL STRICT;

COMMIT;
