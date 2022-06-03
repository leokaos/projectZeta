package org.leo.projectzeta.config.rest;

import java.io.IOException;

import org.leo.projectzeta.factory.TempoFactory;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class TempoDeserializer extends JsonDeserializer<Tempo> {

	@Override
	public Tempo deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
		return TempoFactory.parse(p.getText());
	}

}
