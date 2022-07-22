package org.leo.projectzeta.controller;

import org.leo.projectzeta.api.SimpleFacade;
import org.leo.projectzeta.facade.ProfissionalFacade;
import org.leo.projectzeta.model.Profissional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secured/profissional")
public class ProfissionalController extends AbstractSimpleController<Profissional, Long> {

	@Autowired
	private ProfissionalFacade facade;

	@Override
	protected SimpleFacade<Profissional, Long> getFacade() {
		return facade;
	}

}