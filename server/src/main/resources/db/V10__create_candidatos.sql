CREATE TABLE rh.candidato (
	vaga_id int8 NOT NULL,
	profissional_id int8 NOT NULL,
	pontuacao int4 NOT NULL,
	CONSTRAINT candidato_pk PRIMARY KEY (vaga_id,profissional_id),
	CONSTRAINT candidato_profisional_fk FOREIGN KEY (profissional_id) REFERENCES rh.profissional(id),
	CONSTRAINT candidato_vaga_fk FOREIGN KEY (vaga_id) REFERENCES rh.vaga(id)
);
