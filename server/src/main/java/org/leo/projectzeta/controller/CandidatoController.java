package org.leo.projectzeta.controller;

import org.leo.projectzeta.api.SimpleFacade;
import org.leo.projectzeta.facade.CandidatoFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secured/candidato")
public class CandidatoController extends AbstractSimpleController<Candidato> {

	@Autowired
	private CandidatoFacade facade;

	@Override
	protected SimpleFacade<Candidato> getFacade() {
		return this.facade;
	}

}