package org.leo.projectzeta.controller;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.leo.projectzeta.api.Entidade;
import org.leo.projectzeta.api.SimpleController;
import org.leo.projectzeta.api.SimpleFacade;
import org.leo.projectzeta.exception.BusinessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public abstract class AbstractSimpleController<T extends Entidade<K>, K> implements SimpleController<T, K> {

	@Override
	@RequestMapping(method = GET, produces = APPLICATION_JSON_UTF8_VALUE)
	public List<T> buscarPorFiltro(@RequestParam(required = false) Map<String, Object> parametros) throws BusinessException {

		if (parametros != null && !parametros.isEmpty()) {
			return getFacade().buscarPorFiltro(parametros);
		} else {
			return getFacade().listarTodos();
		}

	}

	@Override
	@RequestMapping(method = GET, produces = APPLICATION_JSON_UTF8_VALUE, path = "/{id}")
	public T buscarPorId(@PathVariable("id") K id) throws BusinessException {
		return this.getFacade().buscarPorId(id);
	}

	@Override
	@ResponseStatus(CREATED)
	@RequestMapping(method = POST, produces = APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<T> criar(@RequestBody @Valid T t) throws BusinessException {
		return ResponseEntity.ok(getFacade().novo(t));
	}

	@Override
	@RequestMapping(method = PUT, produces = APPLICATION_JSON_UTF8_VALUE, path = "/{id}")
	public ResponseEntity<T> salvar(@RequestBody @Valid T t, @PathVariable("id") K id) throws BusinessException {
		return ResponseEntity.ok(getFacade().atualizar(t, id));
	}

	@Override
	@ResponseStatus(NO_CONTENT)
	@RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
	public void removerPorId(@PathVariable("id") K id) throws BusinessException {
		getFacade().removerPorId(id);
	}

	protected abstract SimpleFacade<T, K> getFacade();

}
