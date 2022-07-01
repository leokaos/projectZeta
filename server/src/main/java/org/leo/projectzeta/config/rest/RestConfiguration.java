package org.leo.projectzeta.config.rest;

import static com.fasterxml.jackson.databind.DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES;

import org.leo.projectzeta.model.Equivalencia;
import org.leo.projectzeta.model.Experiencia;
import org.leo.projectzeta.model.Tempo;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

@Configuration
public class RestConfiguration {

    @Bean
    public Jackson2ObjectMapperBuilder jackson2ObjectMapperBuilder() {
        return new Jackson2ObjectMapperBuilder().modules(createSimpleModule());
    }

    @Bean
    public ObjectMapper objectMapper() {

        ObjectMapper objectMapper = new ObjectMapper();

        objectMapper.registerModule(createSimpleModule());
        objectMapper.configure(FAIL_ON_UNKNOWN_PROPERTIES, false);

        return objectMapper;
    }

    private SimpleModule createSimpleModule() {

        SimpleModule m = new SimpleModule();

        m.addSerializer(Tempo.class, new TempoSerializer());
        m.addSerializer(Equivalencia.class, new EquivalenciaSerializer());
        m.addSerializer(Experiencia.class, new ExperienciaSerializer());

        m.addDeserializer(Tempo.class, new TempoDeserializer());

        return m;
    }

}
