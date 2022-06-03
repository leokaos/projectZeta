package org.leo.projectzeta.config.rest;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class EquivalenciaSerializer extends JsonSerializer<Equivalencia> {

	@Override
	public void serialize(Equivalencia value, JsonGenerator gen, SerializerProvider serializers) throws IOException {

		gen.writeStartObject();

		gen.writeNumberField("valor", value.getValor());

		gen.writeObjectFieldStart("destino");
		gen.writeStringField("descricao", value.getDestino().getDescricao());
		gen.writeStringField("id", value.getDestino().getId());
		gen.writeStringField("versao", value.getDestino().getVersao());
		gen.writeEndObject();

		gen.writeEndObject();

	}

}
