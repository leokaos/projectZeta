package org.leo.projectzeta.aspect;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;

@Retention(RUNTIME)
public @interface LogEvent {

	String operation();

}
