package org.leo.projectzeta.config.cache;

import java.util.Collection;

import org.leo.projectzeta.facade.AbstractSimpleFacade;
import org.springframework.cache.CacheManager;
import org.springframework.cache.interceptor.CacheOperationInvocationContext;
import org.springframework.cache.interceptor.SimpleCacheResolver;

import com.google.common.collect.Lists;

public class CustomCacheResolver extends SimpleCacheResolver {

	public CustomCacheResolver(CacheManager cacheManager) {
		super(cacheManager);
	}

	@Override
	protected Collection<String> getCacheNames(CacheOperationInvocationContext<?> context) {

		AbstractSimpleFacade<?> facade = (AbstractSimpleFacade<?>) context.getTarget();

		return Lists.newArrayList(facade.getClasseDaEntidade().getSimpleName());
	}

}
