package org.leo.projectzeta.api;

import java.util.List;
import java.util.Map;

import org.leo.projectzeta.exception.BusinessException;
import org.springframework.http.ResponseEntity;

public interface SimpleController<T extends Entidade<ID>, ID> {

	List<T> buscarPorFiltro(Map<String, Object> parametros) throws BusinessException;

	T buscarPorId(ID id) throws BusinessException;

	void removerPorId(ID id) throws BusinessException;

	ResponseEntity<T> salvar(T t, ID id) throws BusinessException;

	ResponseEntity<T> criar(T t) throws BusinessException;

}
