package org.leo.projectzeta.model;

import java.io.Serializable;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.springframework.data.mongodb.core.mapping.DBRef;

public class Equivalencia implements Serializable {

	private static final long serialVersionUID = 52147683470705058L;

	@DBRef
	private Qualificacao destino;

	@NotNull
	@Max(value = 100L)
	@Min(value = 0L)
	private Integer valor;

	public Equivalencia() {
		super();
	}

	public Qualificacao getDestino() {
		return destino;
	}

	public void setDestino(Qualificacao destino) {
		this.destino = destino;
	}

	public Integer getValor() {
		return valor;
	}

	public void setValor(Integer valor) {
		this.valor = valor;
	}

}
