CREATE TABLE "todolist" (
		"id" SERIAL PRIMARY KEY,
		"task" VARCHAR (250) NOT NULL,
		"completed" BOOLEAN DEFAULT FALSE
	);

INSERT INTO "todolist" ("task", "completed")
	VALUES ('Complete assignment', FALSE), ('Make dinner', FALSE), ('Wash Dishes', FALSE);