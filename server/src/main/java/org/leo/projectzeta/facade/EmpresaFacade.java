package org.leo.projectzeta.facade;

import org.leo.projectzeta.model.Empresa;
import org.leo.projectzeta.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

@Service
public class EmpresaFacade extends AbstractSimpleFacade<Empresa> {

	@Autowired
	private EmpresaRepository repository;

	@Override
	protected MongoRepository<Empresa, String> getRepository() {
		return repository;
	}

	@Override
	public Class<Empresa> getClasseDaEntidade() {
		return Empresa.class;
	}

}
