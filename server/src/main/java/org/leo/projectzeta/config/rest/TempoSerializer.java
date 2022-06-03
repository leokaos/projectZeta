package org.leo.projectzeta.config.rest;

import java.io.IOException;

import org.leo.projectzeta.factory.TempoFactory;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class TempoSerializer extends JsonSerializer<Tempo> {

	@Override
	public void serialize(Tempo value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
		gen.writeString(TempoFactory.format(value));
	}

}
