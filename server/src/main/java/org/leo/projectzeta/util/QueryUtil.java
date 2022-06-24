package org.leo.projectzeta.util;

import org.leo.projectzeta.api.Entidade;
import org.leo.projectzeta.api.SimpleFilter;
import org.leo.projectzeta.config.web.CustomDTOArgumentConverters;

import javax.persistence.Parameter;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.text.MessageFormat;
import java.util.Iterator;
import java.util.Map;

public class QueryUtil {

    private static final String SELECT_FORMAT = "SELECT {0} FROM {1} {0}";
    private static final String WHERE_FORMAT = "WHERE {0}.{1} = :{2}";
    private static final String AND_FORMAT = "AND";
    private static final String SPACE_FORMAT = " ";

    private QueryUtil() {
        super();
    }

    public static String from(Map<String, Object> filtro, Class<?> classeDaEntidade) {

        String alias = createAlias(classeDaEntidade);

        StringBuilder builder = new StringBuilder();

        builder.append(MessageFormat.format(SELECT_FORMAT, alias, classeDaEntidade.getSimpleName()));

        Iterator<String> it = filtro.keySet().iterator();

        if (it.hasNext()) {
            builder.append(SPACE_FORMAT);
        }

        while (it.hasNext()) {

            String key = it.next();
            String parameterName = createParameterName(key);

            builder.append(MessageFormat.format(WHERE_FORMAT, alias, key, parameterName));

            if (it.hasNext()) {
                builder.append(SPACE_FORMAT).append(AND_FORMAT).append(SPACE_FORMAT);
            }
        }

        return builder.toString();
    }

    private static String createAlias(Class<?> classeDaEntidade) {
        return classeDaEntidade.getSimpleName().substring(0, 1).toLowerCase();
    }

    private static String createParameterName(String key) {
        return key.toLowerCase().replace(".", "_");
    }

    public static void bindParameters(Query query, Map<String, Object> filtro) {

        for (String key : filtro.keySet()) {

            String parameterName = createParameterName(key);
            Parameter<?> parameter = query.getParameter(parameterName);
            Object value = CustomDTOArgumentConverters.convert(parameter.getParameterType(), filtro.get(key).toString());

            query.setParameter(parameterName, value);
        }

    }

}
