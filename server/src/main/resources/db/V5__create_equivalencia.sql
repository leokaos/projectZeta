CREATE TABLE rh.equivalencia (
	destino_id numeric NOT NULL,
	origem_id numeric NOT NULL,
	valor numeric(10, 2) NOT NULL,
	CONSTRAINT equivalencia_pk PRIMARY KEY (origem_id,destino_id),
	CONSTRAINT equivalencia_fk_destino FOREIGN KEY (destino_id) REFERENCES rh.qualificacao(id),
	CONSTRAINT equivalencia_fk_origem FOREIGN KEY (origem_id) REFERENCES rh.qualificacao(id)
);
