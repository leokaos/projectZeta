package org.leo.projectzeta.model;

import java.io.Serializable;
import java.util.Date;

public class Periodo implements Serializable {

	private static final long serialVersionUID = -7439942371505419519L;

	private Date dataInicial;

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
