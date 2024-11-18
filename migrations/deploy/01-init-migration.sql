-- Deploy oMyDog:01-init-migration to pg

BEGIN;

CREATE DOMAIN "email" AS text
CHECK(value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])');

CREATE DOMAIN "phone_number" AS VARCHAR(13)
CHECK (value ~ '^(0|\+33|0033)[1-9][0-9]{8}$');

CREATE TABLE "user" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" text NOT NULL,
    "lastname" text,
    "password" text NOT NULL,
    "email" email NOT NULL UNIQUE,
    "city" text NOT NULL,
    "phone_number" phone_number UNIQUE,
    "refresh_token" text,
    "created_at" timestamptz NOT NULL DEFAULT now(), 
    "updated_at" timestamptz
);

CREATE TABLE "announcement" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date_start" date NOT NULL,
    "date_end" date NOT NULL,
    "mobility" boolean NOT NULL,
    "home" boolean NOT NULL,
    "description" text,
    "user_id" int NOT NULL REFERENCES "user" ("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(), 
    "updated_at" timestamptz
);

CREATE TABLE "animal_type" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(), 
    "updated_at" timestamptz
);

CREATE TABLE "announcement_animal_type" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "animal_type_id" int NOT NULL REFERENCES "animal_type" ("id"),
    "announcement_id" int NOT NULL REFERENCES "announcement" ("id"),
    "created_at" timestamptz NOT NULL DEFAULT now(), 
    "updated_at" timestamptz
);

COMMIT;
