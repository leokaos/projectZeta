CREATE TABLE rh.categoria (
	id int8 NOT NULL,
	descricao varchar(255) NOT NULL,
	CONSTRAINT categoria_pk PRIMARY KEY (id)
);

CREATE SEQUENCE rh.categoria_seq INCREMENT BY 1;