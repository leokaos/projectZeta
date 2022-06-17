CREATE TABLE rh.exigencias (
	vaga_id int8 NOT NULL,
	qualificacao_id int8 NOT NULL,
	CONSTRAINT exigencias_pk PRIMARY KEY (vaga_id,qualificacao_id),
	CONSTRAINT exigencias_vaga_fk FOREIGN KEY (vaga_id) REFERENCES rh.vaga(id),
	CONSTRAINT exigencias_qualificacao_fk FOREIGN KEY (qualificacao_id) REFERENCES rh.qualificacao(id)
);
