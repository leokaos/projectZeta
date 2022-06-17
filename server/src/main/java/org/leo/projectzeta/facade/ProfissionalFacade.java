package org.leo.projectzeta.facade;

import org.leo.projectzeta.model.Profissional;
import org.leo.projectzeta.repository.ProfissionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfissionalFacade extends AbstractSimpleFacade<Profissional, Long> {

	@Autowired
	private ProfissionalRepository repository;

	@Override
	protected JpaRepository<Profissional, Long> getRepository() {
		return repository;
	}

	@Override
	public Class<Profissional> getClasseDaEntidade() {
		return Profissional.class;
	}

}
