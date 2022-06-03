CREATE TABLE rh.vaga (
	id numeric NOT NULL,
	empresa_id numeric NOT NULL,
	status varchar(255) NOT NULL,
	titulo varchar(255) NOT NULL,
	descricao text NOT NULL,
	data_inicial timestamp without time zone NOT NULL,
	data_final time without time zone NOT NULL,
	data_entrada timestamp without time zone NOT NULL,
	contato_telefone varchar(255) NOT NULL,
	contato_email varchar(255) NOT NULL,
	CONSTRAINT vaga_pk PRIMARY KEY (id),
	CONSTRAINT vaga_fk_empresa FOREIGN KEY (empresa_id) REFERENCES rh.empresa(id)
);

CREATE SEQUENCE rh.vaga_seq INCREMENT BY 1;

ALTER TABLE rh.vaga ADD CONSTRAINT vaga_check CHECK (status in ('NOVA', 'SELECIONANDO_CANDIDATOS', 'ENTREVISTANDO', 'AGUARDANDO_INICIO', 'INICIADA', 'FINALIZADA', 'CANCELADA'));

