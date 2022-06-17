package org.leo.projectzeta.model;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.leo.projectzeta.api.Entidade;
import org.leo.projectzeta.config.db.TempoConverter;

@Entity
@Table(name = "experiencia", schema = "rh")
public class Experiencia implements Entidade<ExperienciaPK> {

	private static final long serialVersionUID = -1381767258274041223L;

	@EmbeddedId
	private ExperienciaPK id;

	@ManyToOne
	@JoinColumn(name = "qualificacao_id", insertable = false, updatable = false)
	private Qualificacao qualificacao;

	@ManyToOne
	@JoinColumn(name = "profissional_id", insertable = false, updatable = false)
	private Profissional profissional;

	@Column(name = "tempo")
	@Convert(converter = TempoConverter.class)
	private Tempo tempo;

	@Override
	public ExperienciaPK getId() {
		return id;
	}

	public void setId(ExperienciaPK id) {
		this.id = id;
	}

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

	public Tempo getTempo() {
		return tempo;
	}

	public void setTempo(Tempo tempo) {
		this.tempo = tempo;
	}
}
