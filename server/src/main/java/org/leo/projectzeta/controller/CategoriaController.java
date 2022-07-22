package org.leo.projectzeta.controller;

import org.leo.projectzeta.api.SimpleFacade;
import org.leo.projectzeta.facade.CategoriaFacade;
import org.leo.projectzeta.model.Categoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secured/categoria")
public class CategoriaController extends AbstractSimpleController<Categoria, Long> {

	@Autowired
	private CategoriaFacade facade;

	@Override
	protected SimpleFacade<Categoria, Long> getFacade() {
		return this.facade;
	}

}