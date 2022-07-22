package org.leo.projectzeta.config.rest;

import java.io.IOException;

import org.leo.projectzeta.factory.TempoFactory;
import org.leo.projectzeta.model.Experiencia;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class ExperienciaSerializer extends JsonSerializer<Experiencia> {

	@Override
	public void serialize(Experiencia value, JsonGenerator gen, SerializerProvider serializers) throws IOException {

		gen.writeStartObject();

		gen.writeStringField("tempo", TempoFactory.format(value.getTempo()));

		gen.writeObjectFieldStart("qualificacao");
		gen.writeStringField("descricao", value.getQualificacao().getDescricao());
		gen.writeNumberField("id", value.getQualificacao().getId());
		gen.writeStringField("versao", value.getQualificacao().getVersao());
		gen.writeEndObject();

		gen.writeEndObject();

	}

}
