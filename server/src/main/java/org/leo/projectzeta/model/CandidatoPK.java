package org.leo.projectzeta.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class CandidatoPK implements Serializable {

	private static final long serialVersionUID = -2041826426408185887L;

	@ManyToOne
	@JoinColumn(name = "profissional_id")
	private Profissional profissional;

	@ManyToOne
	@JoinColumn(name = "vaga_id")
	private Vaga vaga;

	public Profissional getProfissional() {
		return profissional;
	}

	public void setProfissional(Profissional profissional) {
		this.profissional = profissional;
	}

	public Vaga getVaga() {
		return vaga;
	}

	public void setVaga(Vaga vaga) {
		this.vaga = vaga;
	}

}
