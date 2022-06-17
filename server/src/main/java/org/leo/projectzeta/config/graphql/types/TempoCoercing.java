package org.leo.projectzeta.config.graphql.types;

import org.leo.projectzeta.factory.TempoFactory;
import org.leo.projectzeta.model.Tempo;
import org.springframework.stereotype.Component;

import graphql.schema.Coercing;
import graphql.schema.CoercingParseLiteralException;
import graphql.schema.CoercingParseValueException;
import graphql.schema.CoercingSerializeException;

@Component
public class TempoCoercing implements Coercing<Tempo, String> {

	@Override
	public String serialize(Object dataFetcherResult) throws CoercingSerializeException {

		Tempo tempo = (Tempo) dataFetcherResult;

		return TempoFactory.format(tempo);
	}

	@Override
	public Tempo parseValue(Object input) throws CoercingParseValueException {
		return TempoFactory.parse(input.toString());
	}

	@Override
	public Tempo parseLiteral(Object input) throws CoercingParseLiteralException {
		return TempoFactory.parse(input.toString());
	}

}
