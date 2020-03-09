package org.leo.projectzeta.api;

import java.util.List;
import java.util.Map;

import org.leo.projectzeta.exception.BusinessException;

public interface SimpleFacade<T extends Entidade> {

	T novo(T t) throws BusinessException;

	T atualizar(T t, String id) throws BusinessException;

	List<T> buscarPorFiltro(Map<String, Object> filtro);

	T buscarPorId(String id) throws BusinessException;

	List<T> listarTodos() throws BusinessException;

	void remover(T t) throws BusinessException;

	void removerPorId(String id) throws BusinessException;

}
