package org.leo.projectzeta.model;

import static org.junit.Assert.assertEquals;
import static org.leo.projectzeta.model.builder.QualificacaoBuilder.qualificacao;

import org.junit.Test;

public class QualificacaoTest {

	@Test
	public void deveriaRetornarEquivalenciaCorretaTest() {

		Qualificacao java7 = qualificacao("java", "7", "1");
		Qualificacao java8 = qualificacao("java", "8", "2");

		java7.addEquivalencia(java8, 100);
		java8.addEquivalencia(java7, 70);

		assertEquals(Integer.valueOf(100), java7.getEquivalencia(java8));
		assertEquals(Integer.valueOf(70), java8.getEquivalencia(java7));

		assertEquals(Integer.valueOf(100), java8.getEquivalencia(java8));
		assertEquals(Integer.valueOf(100), java7.getEquivalencia(java7));
	}

}
