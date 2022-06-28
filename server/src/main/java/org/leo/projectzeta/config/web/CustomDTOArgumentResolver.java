package org.leo.projectzeta.config.web;

import static org.leo.projectzeta.config.web.CustomDTOArgumentConverters.convert;

import java.lang.reflect.Field;

import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.commons.lang3.reflect.MethodUtils;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class CustomDTOArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(DTOResolver.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

        Class<?> clazz = parameter.getParameterType();

        Object dto = clazz.newInstance();

        for (Field field : FieldUtils.getFieldsListWithAnnotation(clazz, DTOAttribute.class)) {

            String name = field.getAnnotation(DTOAttribute.class).value();
            Object value = convert(field.getType(), webRequest.getParameter(name));

            MethodUtils.invokeExactMethod(dto, toSetterName(field), new Object[]{value}, new Class[]{value.getClass()});
        }

        return dto;
    }

    private String toSetterName(Field field) {
        return "set" + field.getName().substring(0, 1).toUpperCase() + field.getName().substring(1);
    }

}
