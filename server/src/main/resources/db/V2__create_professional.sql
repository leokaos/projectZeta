CREATE TABLE rh.profissional (
	id numeric NOT NULL,
	nome varchar(255) NOT NULL,
	sobrenome varchar(255) NOT NULL,
	titulo varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	data_contato timestamp without time zone NOT NULL,
	data_comeco timestamp without time zone NULL,
	avatar bytea NULL,
	status varchar(255) NOT NULL,
	CONSTRAINT profissional_pk PRIMARY KEY (id)
);

ALTER TABLE rh.profissional ADD CONSTRAINT profissional_check CHECK (status in ('EM_CONTATO','EM_CONTRATACAO','DISPONIVEL','ALOCADO','FINALIZADO'));
