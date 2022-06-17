package org.leo.projectzeta.api;

import java.util.List;
import java.util.Map;

import org.leo.projectzeta.exception.BusinessException;

public interface SimpleFacade<T extends Entidade<K>, K> {

	T novo(T t) throws BusinessException;

	T atualizar(T t, K id) throws BusinessException;

	List<T> buscarPorFiltro(Map<String, Object> filtro);

	T buscarPorId(K id) throws BusinessException;

	List<T> listarTodos() throws BusinessException;

	void remover(T t) throws BusinessException;

	void removerPorId(K id) throws BusinessException;

}
