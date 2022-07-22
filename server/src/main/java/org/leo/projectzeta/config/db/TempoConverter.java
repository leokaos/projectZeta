package org.leo.projectzeta.config.db;

import javax.persistence.AttributeConverter;

import org.leo.projectzeta.factory.TempoFactory;
import org.leo.projectzeta.model.Tempo;

public class TempoConverter implements AttributeConverter<Tempo, String> {

	@Override
	public String convertToDatabaseColumn(Tempo attribute) {
		return TempoFactory.format(attribute);
	}

	@Override
	public Tempo convertToEntityAttribute(String dbData) {
		return TempoFactory.parse(dbData);
	}

}
