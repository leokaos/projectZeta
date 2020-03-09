package org.leo.projectzeta.factory;

import static org.junit.Assert.*;

import org.junit.Test;
import org.leo.projectzeta.model.Tempo;

public class TempoFactoryTest {

	@Test
	public void deveriaFazerParseCorretamenteTest() {

		assertEquals(10, TempoFactory.parse("10y").getAnos());

		assertEquals(10, TempoFactory.parse("10y2m").getAnos());
		assertEquals(2, TempoFactory.parse("10y2m").getMeses());

		assertEquals(12, TempoFactory.parse("12m").getMeses());
	}

	@Test
	public void deveriaFormatarTempoTest() throws Exception {

		assertEquals("10y", TempoFactory.format(new Tempo(10, 0)));

		assertEquals("10y2m", TempoFactory.format(new Tempo(10, 2)));

		assertEquals("5m", TempoFactory.format(new Tempo(0, 5)));
	}

	@Test
	public void deveriaRetornarUmObjetoNuloTest() throws Exception {
		assertNull(TempoFactory.format(new Tempo()));
	}

	@Test
	public void deveriaSoltarUmaExcecaoQuantoFormatoForInvalidoTest() {

		try {
			TempoFactory.parse("123z");
			fail();
		} catch (IllegalArgumentException e) {
			assertEquals(IllegalArgumentException.class, e.getClass());
		}
	}

}
