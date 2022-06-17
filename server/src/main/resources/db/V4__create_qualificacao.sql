CREATE TABLE rh.qualificacao (
	id int8 NOT NULL,
	descricao varchar(255) NOT NULL,
	versao varchar(255) NOT NULL,
	categoria_id int8 NOT NULL,
	CONSTRAINT qualificacao_pk PRIMARY KEY (id),
	CONSTRAINT qualificacao_fk FOREIGN KEY (categoria_id) REFERENCES rh.categoria(id)
);

CREATE SEQUENCE rh.qualificacao_seq INCREMENT BY 1;