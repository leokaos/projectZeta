package org.leo.projectzeta.facade;

import com.google.common.collect.Maps;
import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.model.Qualificacao;
import org.leo.projectzeta.model.TipoQualificacao;
import org.leo.projectzeta.repository.TipoQualificacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import static org.leo.projectzeta.util.Mensagens.TIPO_QUALIFICACAO_JA_EXISTE;
import static org.leo.projectzeta.util.Mensagens.TIPO_QUALIFICACAO_JA_TEM_QUALIFICACOES_ASSOCIADAS;

@Service
public class TipoQualificacaoFacade extends AbstractSimpleFacade<TipoQualificacao> {

    @Autowired
    private TipoQualificacaoRepository repository;

    @Autowired
    private QualificacaoFacade qualificacaoFacade;

    @Override
    protected MongoRepository<TipoQualificacao, String> getRepository() {
        return repository;
    }

    @Override
    public Class<TipoQualificacao> getClasseDaEntidade() {
        return TipoQualificacao.class;
    }

    @Override
    protected void antesSalvar(TipoQualificacao t)
            throws BusinessException {

        List<TipoQualificacao> listaPorDescricao = repository.findByDescricao(t.getDescricao());

        if (!listaPorDescricao.isEmpty()) {
            throw new BusinessException(TIPO_QUALIFICACAO_JA_EXISTE, "tipoQualificacao", "");
        }

    }

    @Override
    protected void antesRemover(TipoQualificacao t)
            throws BusinessException {

        Map<String, Object> filtro = Maps.newHashMap();
        filtro.put("tipo.id", t.getId());

        List<Qualificacao> qualificacoes = qualificacaoFacade.buscarPorFiltro(filtro);

        if (!qualificacoes.isEmpty()) {
            throw new BusinessException(TIPO_QUALIFICACAO_JA_TEM_QUALIFICACOES_ASSOCIADAS, "tipoQualificacao", "");
        }
    }

}
