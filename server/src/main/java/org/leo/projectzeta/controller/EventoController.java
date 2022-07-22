package org.leo.projectzeta.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.List;
import java.util.Map;

import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.facade.EventoFacade;
import org.leo.projectzeta.model.Evento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secured/evento")
public class EventoController {

	@Autowired
	private EventoFacade facade;

	@RequestMapping(method = GET, produces = APPLICATION_JSON_UTF8_VALUE)
	public List<Evento> buscarPorFiltro(@RequestParam(required = false) Map<String, Object> parametros) throws BusinessException {
		return facade.buscarPorFiltro(parametros);
	}

}
