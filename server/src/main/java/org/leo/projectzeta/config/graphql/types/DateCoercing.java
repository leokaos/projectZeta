package org.leo.projectzeta.config.graphql.types;

import java.util.Date;

import org.springframework.stereotype.Component;

import graphql.schema.Coercing;
import graphql.schema.CoercingParseLiteralException;
import graphql.schema.CoercingParseValueException;
import graphql.schema.CoercingSerializeException;

@Component
public class DateCoercing implements Coercing<Date, Long> {

	@Override
	public Long serialize(Object dataFetcherResult) throws CoercingSerializeException {
		return ((Date) dataFetcherResult).getTime();
	}

	@Override
	public Date parseValue(Object input) throws CoercingParseValueException {
		return new Date((long) input);
	}

	@Override
	public Date parseLiteral(Object input) throws CoercingParseLiteralException {
		return new Date((long) input);
	}

}
