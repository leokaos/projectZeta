package org.leo.projectzeta.controller;

import org.leo.projectzeta.api.SimpleFacade;
import org.leo.projectzeta.facade.TipoQualificacaoFacade;
import org.leo.projectzeta.model.TipoQualificacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secured/tipoQualificacao")
public class TipoQualificacaoController extends AbstractSimpleController<TipoQualificacao> {

	@Autowired
	private TipoQualificacaoFacade facade;

	@Override
	protected SimpleFacade<TipoQualificacao> getFacade() {
		return this.facade;
	}

}