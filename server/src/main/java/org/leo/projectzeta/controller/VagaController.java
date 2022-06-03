package org.leo.projectzeta.controller;

import org.leo.projectzeta.api.SimpleFacade;
import org.leo.projectzeta.facade.VagaFacade;
import org.leo.projectzeta.novo.Vaga;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secured/vaga")
public class VagaController extends AbstractSimpleController<Vaga> {

	@Autowired
	private VagaFacade facade;

	@Override
	protected SimpleFacade<Vaga> getFacade() {
		return this.facade;
	}

}