package org.leo.projectzeta.controller;

import org.leo.projectzeta.api.SimpleFacade;
import org.leo.projectzeta.facade.QualificacaoFacade;
import org.leo.projectzeta.model.Qualificacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secured/qualificacao")
public class QualificacaoController extends AbstractSimpleController<Qualificacao> {

	@Autowired
	private QualificacaoFacade facade;

	@Override
	protected SimpleFacade<Qualificacao> getFacade() {
		return this.facade;
	}

}