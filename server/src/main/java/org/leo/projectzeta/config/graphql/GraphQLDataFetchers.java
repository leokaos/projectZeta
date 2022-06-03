package org.leo.projectzeta.config.graphql;

import com.google.common.collect.Maps;
import graphql.schema.DataFetcher;
import org.leo.projectzeta.config.graphql.types.VagaPorCandidato;
import org.leo.projectzeta.facade.*;
import org.leo.projectzeta.mensagens.VagasMensagens;
import org.leo.projectzeta.model.Candidato;
import org.leo.projectzeta.novo.Empresa;
import org.leo.projectzeta.novo.Vaga;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.leo.projectzeta.model.StatusVaga.ENTREVISTANDO;

@Component
public class GraphQLDataFetchers {

    @Autowired
    private CategoriaFacade categoriaFacade;

    @Autowired
    private CandidatoFacade candidatoFacade;

    @Autowired
    private QualificacaoFacade qualificacaoFacade;

    @Autowired
    private VagaFacade vagaFacade;

    @Autowired
    private EmpresaFacade empresaFacade;

    @Autowired
    private VagasMensagens vagasMensagens;

    public DataFetcher<Categoria> getCategoriaByIdFetcher() {
        return dataFetchingEnvironment -> {
            String categoriaID = dataFetchingEnvironment.getArgument("id");
            return categoriaFacade.buscarPorId(categoriaID);
        };
    }

    public DataFetcher<List<Categoria>> getTodasAsCategoriasFetcher() {
        return dataFetchingEnvironment -> {
            return categoriaFacade.listarTodos();
        };
    }

    public DataFetcher<Candidato> getCandidatoPorIdFetcher() {
        return dataFetchingEnvironment -> {
            String candidatoId = dataFetchingEnvironment.getArgument("id");
            return candidatoFacade.buscarPorId(candidatoId);
        };
    }

    public DataFetcher<List<Qualificacao>> getTodasAsQualificacoes() {
        return dataFetchingEnvironment -> {
            return qualificacaoFacade.listarTodos();
        };
    }

    public DataFetcher<List<Candidato>> getTodosOsCandidatos() {
        return dataFetchingEnvironment -> {
            return candidatoFacade.listarTodos();
        };
    }

    public DataFetcher<Qualificacao> getQualificacaoPorId() {
        return dataFetchingEnvironment -> {
            String qualificacaoId = dataFetchingEnvironment.getArgument("id");
            return qualificacaoFacade.buscarPorId(qualificacaoId);
        };
    }

    public DataFetcher<Vaga> selecionarCandidatos() {
        return dataFetchingEnvironment -> {

            String vagaId = dataFetchingEnvironment.getArgument("id");

            Vaga vaga = vagaFacade.buscarPorId(vagaId);

            vagasMensagens.processVaga(vaga);

            return vaga;
        };
    }

    public DataFetcher<Vaga> iniciarEntrevistas() {
        return dataFetchingEnvironment -> {

            String vagaId = dataFetchingEnvironment.getArgument("id");

            Vaga vaga = vagaFacade.buscarPorId(vagaId);

            vaga.iniarEntrevistas();

            return vaga;
        };
    }

    public DataFetcher<Vaga> iniciar() {
        return dataFetchingEnvironment -> {

            String vagaId = dataFetchingEnvironment.getArgument("id");

            Vaga vaga = vagaFacade.buscarPorId(vagaId);

            vaga.iniciar();

            return vaga;
        };
    }

    public DataFetcher<Vaga> finalizarVaga() {
        return dataFetchingEnvironment -> {

            String vagaId = dataFetchingEnvironment.getArgument("id");

            Vaga vaga = vagaFacade.buscarPorId(vagaId);

            vaga.finalizarVaga();

            return vaga;
        };
    }

    public DataFetcher<Vaga> cancelarVaga() {
        return dataFetchingEnvironment -> {

            String vagaId = dataFetchingEnvironment.getArgument("id");

            Vaga vaga = vagaFacade.buscarPorId(vagaId);

            vaga.cancelarVaga();

            return vaga;
        };
    }

    public DataFetcher<List<Empresa>> todasAsEmpresas() {
        return dataFetchingEnvironment -> {
            return empresaFacade.listarTodos();
        };
    }

    public DataFetcher<List<VagaPorCandidato>> vagasPorCandidato() {

        return dataFetchingEnvironment -> {

            Map<String, Object> filtro = Maps.newHashMap();
            filtro.put("status", ENTREVISTANDO);

            Map<String, Integer> result = Maps.newHashMap();

            for (Vaga vaga : vagaFacade.buscarPorFiltro(filtro)) {

                for (Candidato candidatoSelecionado : vaga.getCandidatosSelecionados()) {

                    String id = candidatoSelecionado.getCandidato().getId();

                    if (!result.containsKey(id)) {
                        result.put(id, 0);
                    }

                    result.put(id, result.get(id) + 1);
                }
            }

            return result
                    .entrySet()
                    .stream()
                    .map(a -> new VagaPorCandidato(a.getKey(), a.getValue()))
                    .collect(Collectors.toList());
        };
    }

}