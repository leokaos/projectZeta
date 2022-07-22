package org.leo.projectzeta.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Embeddable
public class Periodo implements Serializable {

	private static final long serialVersionUID = -7439942371505419519L;

	@NotNull
	@Column(name = "data_inicial")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataInicial;

	@NotNull
	@Column(name = "data_final")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataFinal;

	public Periodo() {
		super();
	}

	public Date getDataInicial() {
		return dataInicial;
	}

	public void setDataInicial(Date dataInicial) {
		this.dataInicial = dataInicial;
	}

	public Date getDataFinal() {
		return dataFinal;
	}

	public void setDataFinal(Date dataFinal) {
		this.dataFinal = dataFinal;
	}

}
