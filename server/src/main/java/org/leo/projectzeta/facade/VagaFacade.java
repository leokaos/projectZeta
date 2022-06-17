package org.leo.projectzeta.facade;

import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.model.Vaga;
import org.leo.projectzeta.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class VagaFacade extends AbstractSimpleFacade<Vaga, Long> {

	private final VagaRepository repository;

	private final EmpresaFacade empresaFacade;

	@Autowired
	public VagaFacade(VagaRepository repository, @Lazy EmpresaFacade empresaFacade) {
		this.repository = repository;
		this.empresaFacade = empresaFacade;
	}

	@Override
	protected JpaRepository<Vaga, Long> getRepository() {
		return repository;
	}

	@Override
	public Class<Vaga> getClasseDaEntidade() {
		return Vaga.class;
	}

	@Override
	protected void antesSalvar(Vaga vaga) throws BusinessException {

		empresaFacade.buscarPorId(vaga.getEmpresa().getId());

	}
}
