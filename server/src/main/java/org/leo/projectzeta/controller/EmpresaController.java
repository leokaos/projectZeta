package org.leo.projectzeta.controller;

import org.leo.projectzeta.api.SimpleFacade;
import org.leo.projectzeta.facade.EmpresaFacade;
import org.leo.projectzeta.model.Empresa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secured/empresa")
public class EmpresaController extends AbstractSimpleController<Empresa, Long> {

	@Autowired
	private EmpresaFacade facade;

	@Override
	protected SimpleFacade<Empresa, Long> getFacade() {
		return this.facade;
	}

}