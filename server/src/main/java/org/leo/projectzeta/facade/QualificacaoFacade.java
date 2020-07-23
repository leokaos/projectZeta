package org.leo.projectzeta.facade;

import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.model.Equivalencia;
import org.leo.projectzeta.model.Qualificacao;
import org.leo.projectzeta.model.TipoQualificacao;
import org.leo.projectzeta.repository.QualificacaoRepository;
import org.leo.projectzeta.repository.TipoQualificacaoRepository;
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
    private TipoQualificacaoRepository tipoQualificacaoRepository;

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

        List<TipoQualificacao> listaPorDescricao = tipoQualificacaoRepository.findByDescricao(t.getTipo().getDescricao());

        if (listaPorDescricao.isEmpty() || listaPorDescricao.size() > 1) {
            throw new BusinessException(TIPO_QUALIFICACAO_INVALIDA,"qualificacao","tipo");
        }

        t.setTipo(listaPorDescricao.iterator().next());
    }

}
