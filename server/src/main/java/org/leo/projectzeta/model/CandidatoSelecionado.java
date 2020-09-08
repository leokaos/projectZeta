package org.leo.projectzeta.model;

import java.io.Serializable;

import org.springframework.data.mongodb.core.mapping.DBRef;

public class CandidatoSelecionado implements Comparable<CandidatoSelecionado>, Serializable {

	private static final long serialVersionUID = -2041826426408185887L;

	private Integer pontuacao;

	@DBRef
	private Candidato candidato;

	public CandidatoSelecionado() {
		super();
	}

	public CandidatoSelecionado(Integer pontuacao, Candidato candidato) {
		super();
		this.pontuacao = pontuacao;
		this.candidato = candidato;
	}

	public Integer getPontuacao() {
		return pontuacao;
	}

	public void setPontuacao(Integer pontuacao) {
		this.pontuacao = pontuacao;
	}

	public Candidato getCandidato() {
		return candidato;
	}

	public void setCandidato(Candidato candidato) {
		this.candidato = candidato;
	}

	@Override
	public int compareTo(CandidatoSelecionado o) {
		return this.pontuacao.compareTo(o.pontuacao);
	}

}
