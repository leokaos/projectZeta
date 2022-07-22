package org.leo.projectzeta.config.web;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public final class CustomDTOArgumentConverters {

    private static final Map<Class<?>, Function<String, Object>> CONVERTERS = new HashMap<>();

    static {

        CONVERTERS.put(String.class, (String source) -> source);
        CONVERTERS.put(Long.class, Long::valueOf);
    }

    private CustomDTOArgumentConverters() {
        super();
    }

    public static Object convert(Class<?> clazz, String source){
        return CONVERTERS.get(clazz).apply(source);
    }
}
