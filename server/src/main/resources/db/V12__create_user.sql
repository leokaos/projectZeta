CREATE TABLE rh.user (
	username varchar(255) NOT NULL,
	avatar text NULL,
	email varchar(255),
	CONSTRAINT user_pk PRIMARY KEY (username)
);