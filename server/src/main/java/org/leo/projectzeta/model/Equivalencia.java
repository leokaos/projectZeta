package org.leo.projectzeta.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.leo.projectzeta.api.Entidade;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "equivalencia", schema = "rh")
public class Equivalencia implements Entidade<EquivalenciaPK> {

	private static final long serialVersionUID = 52147683470705058L;

	@EmbeddedId
	private EquivalenciaPK id;

	@ManyToOne
	@JoinColumn(name = "destino_id", insertable = false, updatable = false)
	private Qualificacao destino;

	@ManyToOne
	@JoinColumn(name = "origem_id", insertable = false, updatable = false)
	private Qualificacao origem;

	@NotNull
	@Max(value = 100L)
	@Min(value = 0L)
	private Integer valor;

}
