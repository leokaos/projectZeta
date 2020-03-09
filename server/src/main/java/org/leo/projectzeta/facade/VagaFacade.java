package org.leo.projectzeta.facade;

import org.leo.projectzeta.model.Vaga;
import org.leo.projectzeta.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

@Service
public class VagaFacade extends AbstractSimpleFacade<Vaga> {

	@Autowired
	private VagaRepository repository;

	@Override
	protected MongoRepository<Vaga, String> getRepository() {
		return repository;
	}

	@Override
	public Class<Vaga> getClasseDaEntidade() {
		return Vaga.class;
	}

}
