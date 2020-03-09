package org.leo.projectzeta.model;

import java.io.Serializable;

import org.springframework.data.mongodb.core.mapping.DBRef;

public class Experiencia implements Serializable {

	private static final long serialVersionUID = -1381767258274041223L;

	@DBRef
	private Qualificacao qualificacao;
	private Tempo tempo;

	public Experiencia() {
		super();
	}

	public Qualificacao getQualificacao() {
		return qualificacao;
	}

	public void setQualificacao(Qualificacao qualificacao) {
		this.qualificacao = qualificacao;
	}

	public Tempo getTempo() {
		return tempo;
	}

	public void setTempo(Tempo tempo) {
		this.tempo = tempo;
	}

}
