package org.leo.projectzeta.facade;

import static org.leo.projectzeta.util.Mensagens.CATEGORIA_JA_EXISTE;
import static org.leo.projectzeta.util.Mensagens.CATEGORIA_JA_TEM_QUALIFICACOES_ASSOCIADAS;

import java.util.List;
import java.util.Map;

import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.model.Categoria;
import org.leo.projectzeta.model.Qualificacao;
import org.leo.projectzeta.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.google.common.collect.Maps;

@Service
public class CategoriaFacade extends AbstractSimpleFacade<Categoria, Long> {

	@Autowired
	private CategoriaRepository repository;

	@Autowired
	private QualificacaoFacade qualificacaoFacade;

	@Override
	protected JpaRepository<Categoria, Long> getRepository() {
		return repository;
	}

	@Override
	public Class<Categoria> getClasseDaEntidade() {
		return Categoria.class;
	}

	@Override
	protected void antesSalvar(Categoria t) throws BusinessException {

		List<Categoria> listaPorDescricao = repository.findByDescricao(t.getDescricao());

		if (!listaPorDescricao.isEmpty()) {
			throw new BusinessException(CATEGORIA_JA_EXISTE, "cao", "");
		}

	}

	@Override
	protected void antesRemover(Categoria t) throws BusinessException {

		Map<String, Object> filtro = Maps.newHashMap();
		filtro.put("tipo.id", t.getId());

		List<Qualificacao> qualificacoes = qualificacaoFacade.buscarPorFiltro(filtro);

		if (!qualificacoes.isEmpty()) {
			throw new BusinessException(CATEGORIA_JA_TEM_QUALIFICACOES_ASSOCIADAS, "categoria", "");
		}
	}

}
