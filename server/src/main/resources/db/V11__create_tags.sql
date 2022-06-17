CREATE TABLE rh.tags (
	vaga_id int8 NOT NULL,
	tag varchar(255) NOT NULL,
	CONSTRAINT tags_pk PRIMARY KEY (vaga_id,tag),
	CONSTRAINT tags_vagas_fk FOREIGN KEY (vaga_id) REFERENCES rh.vaga(id)
);
