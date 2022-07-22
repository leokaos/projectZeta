CREATE TABLE rh.experiencia (
	profissional_id int8 NOT NULL,
	qualificacao_id int8 NOT NULL,
	tempo varchar(255) NOT NULL,
	CONSTRAINT experiencia_pk PRIMARY KEY (profissional_id,qualificacao_id),
	CONSTRAINT experiencia_fk_qualificacao FOREIGN KEY (qualificacao_id) REFERENCES rh.qualificacao(id),
	CONSTRAINT experiencia_fk_profissional FOREIGN KEY (profissional_id) REFERENCES rh.profissional(id)
);
