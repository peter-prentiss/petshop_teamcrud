CREATE TABLE "owners" (
	"id" serial primary key,
	"first_name" varchar (100) not null,
	"last_name" varchar(100) not null
);

CREATE TABLE "pets" (
	"id" serial primary key,
	"name" varchar (100) not null,
	"breed" varchar(100) not null,
	"color" varchar (100) not null,
	"owner_id" varchar(100) not null
);


CREATE TABLE "visits" (
	"id" serial primary key,
	"check_in_date" timestamp,
	"check_out_date" timestamp,
  "pet_id" varchar (100) not null
);

INSERT INTO "owners" ("first_name", "last_name")
VALUES ('Igor', 'Klempt');

INSERT INTO "pets" ("name", "breed", "color", "owner_id")
VALUES ('Sally', 'lizard', 'lime green', 1);

INSERT INTO "visits" ("pet_id")
VALUES (1);
