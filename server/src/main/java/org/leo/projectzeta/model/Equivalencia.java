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

@Entity
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

	@Override
	public EquivalenciaPK getId() {
		return id;
	}

	public void setId(EquivalenciaPK id) {
		this.id = id;
	}

	public Qualificacao getDestino() {
		return destino;
	}

	public void setDestino(Qualificacao destino) {
		this.destino = destino;
	}

	public Qualificacao getOrigem() {
		return origem;
	}

	public void setOrigem(Qualificacao origem) {
		this.origem = origem;
	}

	public Integer getValor() {
		return valor;
	}

	public void setValor(Integer valor) {
		this.valor = valor;
	}
}
