package org.leo.projectzeta.facade;

import java.util.Map;

import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.model.Empresa;
import org.leo.projectzeta.repository.EmpresaRepository;
import org.leo.projectzeta.util.Mensagens;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.google.common.collect.Maps;

@Service
public class EmpresaFacade extends AbstractSimpleFacade<Empresa, Long> {

	@Autowired
	private EmpresaRepository repository;

	@Autowired
	private VagaFacade vagaFacade;

	@Override
	protected void antesRemover(Empresa empresa) throws BusinessException {

		if (empresa.getId() != null) {

			Map<String, Object> filtro = Maps.newHashMap();
			filtro.put("empresa.id", empresa.getId());

			if (!vagaFacade.buscarPorFiltro(filtro).isEmpty()) {
				throw new BusinessException(Mensagens.EMPRESA_POSSUI_VAGAS, "empresa", "vaga");
			}
		}
	}

	@Override
	protected JpaRepository<Empresa, Long> getRepository() {
		return repository;
	}

	@Override
	public Class<Empresa> getClasseDaEntidade() {
		return Empresa.class;
	}

}
