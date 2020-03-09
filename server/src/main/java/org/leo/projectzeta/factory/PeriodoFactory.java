package org.leo.projectzeta.factory;

import java.util.Date;

import org.leo.projectzeta.model.Periodo;

public class PeriodoFactory {

	private PeriodoFactory() {
		super();
	}

	public static Periodo from(Date dataInicial, Date dataFinal) {

		Periodo periodo = new Periodo();

		periodo.setDataInicial(dataInicial);
		periodo.setDataFinal(dataFinal);

		return periodo;
	}

}
