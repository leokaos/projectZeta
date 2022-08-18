package org.leo.projectzeta.config.web;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public final class CustomDTOArgumentConverters {

	private static final Map<Class<?>, Function<String, Object>> CONVERTERS = new HashMap<>();

	static {

		CONVERTERS.put(String.class, String::toString);
		CONVERTERS.put(Long.class, Long::valueOf);
	}

	private CustomDTOArgumentConverters() {
		super();
	}

	@SuppressWarnings("rawtypes")
	public static Object convert(Class clazz, String source) {

		if (clazz.isEnum()) {
			return convertEnum(clazz, source);
		}

		return CONVERTERS.get(clazz).apply(source);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static Object convertEnum(Class clazz, String source) {
		return Enum.valueOf(clazz, source);
	}
}
