package org.leo.projectzeta.facade;

import org.leo.projectzeta.model.Candidato;
import org.leo.projectzeta.repository.CandidatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

@Service
public class CandidatoFacade extends AbstractSimpleFacade<Candidato> {

	@Autowired
	private CandidatoRepository repository;

	@Override
	protected MongoRepository<Candidato, String> getRepository() {
		return repository;
	}

	@Override
	public Class<Candidato> getClasseDaEntidade() {
		return Candidato.class;
	}

}
