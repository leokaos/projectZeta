package org.leo.projectzeta.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.leo.projectzeta.api.Entidade;

@Entity
@Table(name = "candidato", schema = "rh")
public class Candidato implements Entidade<CandidatoPK> {

	private static final long serialVersionUID = -2041826426408185887L;

	@EmbeddedId
	private CandidatoPK id;

	@ManyToOne
	@JoinColumn(name = "profissional_id", insertable = false, updatable = false)
	private Profissional profissional;

	@ManyToOne
	@JoinColumn(name = "vaga_id", insertable = false, updatable = false)
	private Vaga vaga;

	@Column(name = "pontuacao")
	private Integer pontuacao;

	public Candidato() {
		super();
	}

	public CandidatoPK getId() {
		return id;
	}

	public void setId(CandidatoPK id) {
		this.id = id;
	}

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

	public Integer getPontuacao() {
		return pontuacao;
	}

	public void setPontuacao(Integer pontuacao) {
		this.pontuacao = pontuacao;
	}

	public static Candidato createFrom(Vaga vaga, Profissional profissional, Integer pontuacao) {

		CandidatoPK pk = new CandidatoPK();
		pk.setProfissional(profissional);
		pk.setVaga(vaga);

		Candidato candidato = new Candidato();

		candidato.setProfissional(profissional);
		candidato.setVaga(vaga);
		candidato.setPontuacao(pontuacao);
		candidato.setId(pk);

		return candidato;
	}

}
