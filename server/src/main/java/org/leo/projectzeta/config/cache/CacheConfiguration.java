package org.leo.projectzeta.config.cache;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.CacheResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

@Configuration
@EnableCaching(proxyTargetClass = true)
public class CacheConfiguration extends CachingConfigurerSupport {

	@Value("${cache.hostname}")
	private String hostname;

	@Value("${cache.port}")
	private Integer port;

	@Autowired
	private CacheManager cacheManager;

	@Bean
	public JedisConnectionFactory jedisConnectionFactory() {

		RedisStandaloneConfiguration configuration = new RedisStandaloneConfiguration();

		configuration.setHostName(hostname);
		configuration.setPort(port);

		return new JedisConnectionFactory(configuration);
	}

	@Bean
	public RedisTemplate<String, Object> redisTemplate() {

		RedisTemplate<String, Object> template = new RedisTemplate<>();

		template.setConnectionFactory(jedisConnectionFactory());

		return template;
	}

	@Override
	public CacheResolver cacheResolver() {
		return new CustomCacheResolver(cacheManager);
	}

}
