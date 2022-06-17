package org.leo.projectzeta.model;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.leo.projectzeta.factory.TempoFactory;
import org.leo.projectzeta.model.Tempo;

public class TempoFactoryTest {

	@Test
	public void deveriaCriarUmTempoCorretamenteTest() {

		Tempo tempoComAnos = TempoFactory.parse("1y2m");

		assertEquals(1, tempoComAnos.getAnos());
		assertEquals(2, tempoComAnos.getMeses());

		Tempo tempoSemAnos = TempoFactory.parse("3m");

		assertEquals(0, tempoSemAnos.getAnos());
		assertEquals(3, tempoSemAnos.getMeses());
	}

	@Test(expected = IllegalArgumentException.class)
	public void deveriaSoltarUmaIllegalArgumentTestTest() {
		TempoFactory.parse("asdasdsadsa");
	}

}
