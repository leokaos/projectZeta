package org.leo.projectzeta.model;

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
