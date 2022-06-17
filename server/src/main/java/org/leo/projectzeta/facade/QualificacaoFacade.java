package org.leo.projectzeta.facade;

import static org.leo.projectzeta.util.Mensagens.CATEGORIA_INVALIDA;
import static org.leo.projectzeta.util.Mensagens.EQUIVALENCIA_INVALIDA;
import static org.leo.projectzeta.util.Mensagens.QUALIFICACAO_JA_EXISTE;

import java.util.List;

import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.model.Categoria;
import org.leo.projectzeta.model.Equivalencia;
import org.leo.projectzeta.model.Qualificacao;
import org.leo.projectzeta.repository.CategoriaRepository;
import org.leo.projectzeta.repository.QualificacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class QualificacaoFacade extends AbstractSimpleFacade<Qualificacao, Long> {

	@Autowired
	private QualificacaoRepository repository;

	@Autowired
	private CategoriaRepository categoriaRepository;

	@Override
	protected JpaRepository<Qualificacao, Long> getRepository() {
		return repository;
	}

	@Override
	public Class<Qualificacao> getClasseDaEntidade() {
		return Qualificacao.class;
	}

	@Override
	protected void antesSalvar(Qualificacao t) throws BusinessException {

		verificarSeExiste(t);

		configurarTipo(t);

		validarEquivalencias(t);
	}

	private void verificarSeExiste(Qualificacao t) throws BusinessException {

		Qualificacao existingQualificacao = repository.findByDescricaoAndVersao(t.getDescricao(), t.getVersao());

		if (existingQualificacao != null && !existingQualificacao.getId().equals(t.getId())) {
			throw new BusinessException(QUALIFICACAO_JA_EXISTE, "qualificacao", "");
		}

	}

	private void validarEquivalencias(Qualificacao t) throws BusinessException {

		if (t.getEquivalencias() != null) {

			for (Equivalencia eq : t.getEquivalencias()) {
				if (!repository.findById(eq.getDestino().getId()).isPresent()) {
					throw new BusinessException(EQUIVALENCIA_INVALIDA, "equivalencia", "");
				}
			}

		}
	}

	private void configurarTipo(Qualificacao t) throws BusinessException {

		List<Categoria> listaPorDescricao = categoriaRepository.findByDescricao(t.getCategoria().getDescricao());

		if (listaPorDescricao.isEmpty() || listaPorDescricao.size() > 1) {
			throw new BusinessException(CATEGORIA_INVALIDA, "qualificacao", "tipo");
		}

		t.setCategoria(listaPorDescricao.iterator().next());
	}

}
