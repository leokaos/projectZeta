package org.leo.projectzeta.model;

import org.codehaus.jackson.annotate.JsonProperty;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;

public class Periodo implements Serializable {

	private static final long serialVersionUID = -7439942371505419519L;

	@NotNull
	private Date dataInicial;

	@NotNull
	private Date dataFinal;

	public Periodo() {
		super();
	}

	@JsonProperty("data-inicial")
	public Date getDataInicial() {
		return dataInicial;
	}

	public void setDataInicial(Date dataInicial) {
		this.dataInicial = dataInicial;
	}

	@JsonProperty("data-final")
	public Date getDataFinal() {
		return dataFinal;
	}

	public void setDataFinal(Date dataFinal) {
		this.dataFinal = dataFinal;
	}

}
