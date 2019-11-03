BEGIN TRANSACTION;
DROP TABLE IF EXISTS "users";
CREATE TABLE IF NOT EXISTS "users" (
	"email"	VARCHAR(255) NOT NULL UNIQUE,
	"password"	VARCHAR(60) NOT NULL,
	"balance"	REAL NOT NULL DEFAULT 0,
	PRIMARY KEY("email")
);
DROP TABLE IF EXISTS "user_funds";
CREATE TABLE IF NOT EXISTS "user_funds" (
	"user"	VARCHAR(255) NOT NULL,
	"fund"	CHAR(4) NOT NULL,
	"amount"	REAL NOT NULL,
	PRIMARY KEY("user","fund")
);
DROP TABLE IF EXISTS "funds";
CREATE TABLE IF NOT EXISTS "funds" (
	"name"	CHAR(4) NOT NULL UNIQUE,
	"long_name"	VARCHAR(255) NOT NULL UNIQUE,
	"value"	INTEGER NOT NULL,
	"rate"	INTEGER NOT NULL,
	"variance"	INTEGER NOT NULL,
	PRIMARY KEY("name")
);
INSERT INTO "users" ("email","password","balance") VALUES ('test@example.com','$2a$08$uFnSpwvEUJvH78IpLUn3wOqw427Lit3d4onDtfVyxGWNgZ43qaJvW',161.125262541526),
 ('hej@hej.hej','$2a$08$raRH50e20D5VuLSGe9Zfe.tmRWhy8mp/H.3luESEobl8/LZcTFOzS',100.0);
INSERT INTO "user_funds" ("user","fund","amount") VALUES ('test@example.com','KTI',14.0),
 ('test@example.com','ATS',2.0);
INSERT INTO "funds" ("name","long_name","value","rate","variance") VALUES ('KTI','Kapitårtinvest',20,1.0005,0.5),
 ('ATS','Alletårtspar',20,1.0003,0.2);
COMMIT;
