package org.leo.projectzeta.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.leo.projectzeta.api.Entidade;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "candidato", schema = "rh")
public class Candidato implements Entidade<CandidatoPK> {

	private static final long serialVersionUID = -2041826426408185887L;

	@EmbeddedId
	@JsonIgnore
	private CandidatoPK id;

	@ManyToOne
	@JoinColumn(name = "profissional_id", insertable = false, updatable = false)
	private Profissional profissional;

	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "vaga_id", insertable = false, updatable = false)
	private Vaga vaga;

	@Column(name = "pontuacao")
	private Integer pontuacao;

	public static Candidato createFrom(Vaga vaga, Profissional profissional, Integer pontuacao) {

		CandidatoPK pk = new CandidatoPK();
		pk.setProfissional(profissional.getId());
		pk.setVaga(vaga.getId());

		Candidato candidato = new Candidato();

		candidato.setPontuacao(pontuacao);
		candidato.setId(pk);

		return candidato;
	}

}
