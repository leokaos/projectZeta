package org.leo.projectzeta.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class ExperienciaPK implements Serializable {

	private static final long serialVersionUID = 1577375438678405665L;

	@ManyToOne
	@JoinColumn(name = "qualificacao_id")
	private Qualificacao qualificacao;

	@ManyToOne
	@JoinColumn(name = "profissional_id")
	private Profissional profissional;

	public Qualificacao getQualificacao() {
		return qualificacao;
	}

	public void setQualificacao(Qualificacao qualificacao) {
		this.qualificacao = qualificacao;
	}

	public Profissional getProfissional() {
		return profissional;
	}

	public void setProfissional(Profissional profissional) {
		this.profissional = profissional;
	}
}
