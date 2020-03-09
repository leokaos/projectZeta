package org.leo.projectzeta.facade;

import static org.leo.projectzeta.util.Mensagens.*;
import static org.leo.projectzeta.util.Mensagens.OBJECT_NULO;
import static org.leo.projectzeta.util.MongoFiltroUtil.toQuery;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.leo.projectzeta.api.Entidade;
import org.leo.projectzeta.api.SimpleFacade;
import org.leo.projectzeta.aspect.LogEvent;
import org.leo.projectzeta.aspect.LogId;
import org.leo.projectzeta.aspect.LogObject;
import org.leo.projectzeta.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;

public abstract class AbstractSimpleFacade<T extends Entidade> implements SimpleFacade<T> {

	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	@LogEvent(operation = "Criar")
	public T novo(@LogObject T t) throws BusinessException {

		if (t == null) {
			throw new BusinessException(OBJECT_NULO);
		}

		if (StringUtils.isNotEmpty(t.getId())) {
			throw new BusinessException(ID_INVALIDO);
		}

		antesSalvar(t);

		T entity = getRepository().insert(t);

		depoisSalvar(entity);

		return entity;
	}

	@Override
	@CacheEvict(key = "#id")
	@LogEvent(operation = "Atualizar")
	public T atualizar(@LogObject T t, @LogId String id) throws BusinessException {

		if (t == null) {
			throw new BusinessException(OBJECT_NULO);
		}

		if (StringUtils.isEmpty(id)) {
			throw new BusinessException(ID_INVALIDO);
		}

		if (!id.equals(t.getId())) {
			throw new BusinessException(ID_INVALIDO);
		}

		if (!getRepository().existsById(id)) {
			throw new BusinessException(ID_INVALIDO);
		}

		antesSalvar(t);

		T entity = getRepository().save(t);

		depoisSalvar(entity);

		return entity;
	}

	@Override
	public List<T> buscarPorFiltro(Map<String, Object> filtro) {

		if (filtro == null || filtro.isEmpty()) {
			return getRepository().findAll();
		}

		return mongoTemplate.find(toQuery(filtro), getClasseDaEntidade());
	}

	@Override
	@Cacheable
	public T buscarPorId(String id) throws BusinessException {

		if (StringUtils.isEmpty(id)) {
			throw new BusinessException(ID_INVALIDO);
		}

		if (!getRepository().existsById(id)) {
			throw new BusinessException(ENTIDADE_INEXISTENTE);
		}

		return getRepository().findById(id).orElse(null);
	}

	@Override
	public void remover(T t) throws BusinessException {

		if (t == null) {
			throw new BusinessException(OBJECT_NULO);
		}

		if (StringUtils.isEmpty(t.getId())) {
			throw new BusinessException(ID_INVALIDO);
		}

		if (!getRepository().existsById(t.getId())) {
			throw new BusinessException(ID_INVALIDO);
		}

		removerInterno(t);
	}

	@Override
	@CacheEvict(key = "#id")
	public void removerPorId(String id) throws BusinessException {

		if (StringUtils.isEmpty(id)) {
			throw new BusinessException(ID_INVALIDO);
		}

		if (!getRepository().existsById(id)) {
			throw new BusinessException(ID_INVALIDO);
		}

		T entidade = getRepository().findById(id).orElse(null);

		removerInterno(entidade);
	}

	@LogEvent(operation = "Remover")
	private void removerInterno(@LogObject T entidade) throws BusinessException {

		antesRemover(entidade);

		getRepository().delete(entidade);

		depoisRemover(entidade);
	}

	@Override
	public List<T> listarTodos() throws BusinessException {
		return getRepository().findAll();
	}

	protected void antesSalvar(T t) throws BusinessException {

	}

	protected void depoisSalvar(T t) {

	}

	protected void antesRemover(T t) throws BusinessException {

	}

	protected void depoisRemover(T t) {

	}

	protected abstract MongoRepository<T, String> getRepository();

	public abstract Class<T> getClasseDaEntidade();

}
