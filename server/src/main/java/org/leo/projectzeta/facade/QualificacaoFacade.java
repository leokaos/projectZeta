package org.leo.projectzeta.facade;

import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.repository.QualificacaoRepository;
import org.leo.projectzeta.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.leo.projectzeta.util.Mensagens.*;

@Service
public class QualificacaoFacade extends AbstractSimpleFacade<Qualificacao> {

    @Autowired
    private QualificacaoRepository repository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Override
    protected MongoRepository<Qualificacao, String> getRepository() {
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
                    throw new BusinessException(EQUIVALENCIA_INVALIDA,"equivalencia","");
                }
            }

        }
    }

    private void configurarTipo(Qualificacao t) throws BusinessException {

        List<Categoria> listaPorDescricao = categoriaRepository.findByDescricao(t.getCategoria().getDescricao());

        if (listaPorDescricao.isEmpty() || listaPorDescricao.size() > 1) {
            throw new BusinessException(CATEGORIA_INVALIDA,"qualificacao","tipo");
        }

        t.setCategoria(listaPorDescricao.iterator().next());
    }

}
