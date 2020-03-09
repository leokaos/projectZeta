package org.leo.projectzeta.controller;

import org.leo.projectzeta.api.SimpleFacade;
import org.leo.projectzeta.facade.EventoFacade;
import org.leo.projectzeta.model.Evento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secured/evento")
public class EventoController extends AbstractSimpleController<Evento> {

	@Autowired
	private EventoFacade facade;

	@Override
	protected SimpleFacade<Evento> getFacade() {
		return facade;
	}

}
