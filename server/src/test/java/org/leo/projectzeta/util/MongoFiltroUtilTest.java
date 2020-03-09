package org.leo.projectzeta.util;

import static org.junit.Assert.assertEquals;

import java.util.Date;
import java.util.Map;

import org.junit.Test;
import org.springframework.data.mongodb.core.query.Query;

import com.google.common.collect.Maps;

public class MongoFiltroUtilTest {

	@Test
	public void deveriaRetornarUmaQueryComTresParametrosComMaxResultsTest() throws Exception {

		Date testDate = new Date();
		Map<String, Object> map = Maps.newHashMap();

		map.put("parametro1", "teste");
		map.put("parametro2", 20);
		map.put("parametro3", testDate);

		Query query = MongoFiltroUtil.toQuery(map);

		assertEquals("teste", query.getQueryObject().get("parametro1"));
		assertEquals(20, query.getQueryObject().get("parametro2"));
		assertEquals(testDate, query.getQueryObject().get("parametro3"));

	}

	@Test
	public void deveriaRetornarUmaQueryComTresParametrosComMaxResultsInvalidoTest() throws Exception {

		Map<String, Object> map = Maps.newHashMap();

		map.put("maxResults", "20a");

		Query query = MongoFiltroUtil.toQuery(map);

		assertEquals(0, query.getLimit());
	}

	@Test
	public void deveriaRetornarUmaQueryComTresParametrosComMaxResultsValidoTest() throws Exception {

		Map<String, Object> map = Maps.newHashMap();

		map.put("maxResults", 20);

		Query query = MongoFiltroUtil.toQuery(map);

		assertEquals(20, query.getLimit());
	}

	@Test
	public void deveriaRetornarUmaQueryComTresParametrosComMaxResultsNuloTest() throws Exception {

		Map<String, Object> map = Maps.newHashMap();

		map.put("maxResults", null);

		Query query = MongoFiltroUtil.toQuery(map);

		assertEquals(0, query.getLimit());
	}

}
