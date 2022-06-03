CREATE TABLE rh.empresa (
	id numeric NOT NULL,
	nome varchar(255) NOT NULL,
	CONSTRAINT empresa_pk PRIMARY KEY (id)
);

CREATE SEQUENCE rh.empresa_seq INCREMENT BY 1;