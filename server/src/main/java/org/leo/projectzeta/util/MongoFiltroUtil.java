package org.leo.projectzeta.util;

import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.google.common.collect.Lists;

public class MongoFiltroUtil {

	private static final String MAX_RESULTS = "maxResults";

	private static final List<String> NAO_FILTRO = Lists.newArrayList(MAX_RESULTS);

	private MongoFiltroUtil() {
		super();
	}

	public static Criteria toCriteria(Map<String, ?> map) {

		Criteria criteria = new Criteria();

		for (String key : map.keySet()) {

			if (!NAO_FILTRO.contains(key)) {
				criteria.and(key).is(map.get(key));
			}
		}

		return criteria;
	}

	public static Query toQuery(Map<String, ?> map) {

		Query query = new Query(toCriteria(map));

		if (map.containsKey(MAX_RESULTS)) {
			query.limit(toInt(map.get(MAX_RESULTS)));
		}

		return query;
	}

	private static Integer toInt(Object obj) {

		if (obj == null) {
			return 0;
		}

		try {
			return Integer.valueOf(obj.toString());
		} catch (NumberFormatException e) {
			return 0;
		}
	}

}
