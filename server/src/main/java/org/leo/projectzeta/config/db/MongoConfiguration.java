package org.leo.projectzeta.config.db;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.MongoClient;

@Configuration
@EnableMongoRepositories(basePackages = "org.leo.projectzeta.repository")
public class MongoConfiguration extends AbstractMongoConfiguration {

	@Value("${mongo.host}")
	private String host;

	@Value("${mongo.port}")
	private Integer port;

	@Override
	protected String getDatabaseName() {
		return "rh";
	}

	@Override
	public MongoClient mongoClient() {
		return new MongoClient(host, port);
	}

	@Override
	protected String getMappingBasePackage() {
		return "org.leo.projectzeta.model";
	}

	@Bean
	public MongoTemplate mongoTemplate() {
		return new MongoTemplate(mongoClient(), getDatabaseName());
	}

}
