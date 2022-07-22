package org.leo.projectzeta.config.web;

import java.lang.annotation.*;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface DTOAttribute {

    String value();

}