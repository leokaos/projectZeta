package org.leo.projectzeta.config.graphql;

import static org.leo.projectzeta.model.StatusVaga.ENTREVISTANDO;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.leo.projectzeta.config.graphql.types.VagaPorCandidato;
import org.leo.projectzeta.facade.CategoriaFacade;
import org.leo.projectzeta.facade.EmpresaFacade;
import org.leo.projectzeta.facade.ProfissionalFacade;
import org.leo.projectzeta.facade.QualificacaoFacade;
import org.leo.projectzeta.facade.VagaFacade;
import org.leo.projectzeta.mensagens.VagasMensagens;
import org.leo.projectzeta.model.Candidato;
import org.leo.projectzeta.model.Categoria;
import org.leo.projectzeta.model.Empresa;
import org.leo.projectzeta.model.Profissional;
import org.leo.projectzeta.model.Qualificacao;
import org.leo.projectzeta.model.Vaga;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.common.collect.Maps;

import graphql.schema.DataFetcher;

@Component
public class GraphQLDataFetchers {

	@Autowired
	private CategoriaFacade categoriaFacade;

	@Autowired
	private ProfissionalFacade profissionalFacade;

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
			Integer categoriaID = dataFetchingEnvironment.getArgument("id");
			return categoriaFacade.buscarPorId(categoriaID.longValue());
		};
	}

	public DataFetcher<List<Categoria>> getTodasAsCategoriasFetcher() {
		return dataFetchingEnvironment -> {
			return categoriaFacade.listarTodos();
		};
	}

	public DataFetcher<Profissional> getProfissionalPorIdFetcher() {
		return dataFetchingEnvironment -> {
			Integer candidatoId = dataFetchingEnvironment.getArgument("id");
			return profissionalFacade.buscarPorId(candidatoId.longValue());
		};
	}

	public DataFetcher<List<Qualificacao>> getTodasAsQualificacoes() {
		return dataFetchingEnvironment -> {
			return qualificacaoFacade.listarTodos();
		};
	}

	public DataFetcher<List<Qualificacao>> getQualificacaoPorQuery() {
		return dataFetchingEnvironment -> {
			String query = dataFetchingEnvironment.getArgument("query");
			return qualificacaoFacade.listarPorNome(query);
		};
	}

	public DataFetcher<List<Profissional>> getTodosOsCandidatos() {
		return dataFetchingEnvironment -> {
			return profissionalFacade.listarTodos();
		};
	}

	public DataFetcher<Qualificacao> getQualificacaoPorId() {
		return dataFetchingEnvironment -> {
			Integer qualificacaoId = dataFetchingEnvironment.getArgument("id");
			return qualificacaoFacade.buscarPorId(qualificacaoId.longValue());
		};
	}

	public DataFetcher<Vaga> selecionarCandidatos() {
		return dataFetchingEnvironment -> {

			Integer vagaId = dataFetchingEnvironment.getArgument("id");

			Vaga vaga = vagaFacade.buscarPorId(vagaId.longValue());

			vagasMensagens.processVaga(vaga);

			return vaga;
		};
	}

	public DataFetcher<Vaga> iniciarEntrevistas() {
		return dataFetchingEnvironment -> {

			Integer vagaId = dataFetchingEnvironment.getArgument("id");

			Vaga vaga = vagaFacade.buscarPorId(vagaId.longValue());

			vaga.iniarEntrevistas();

			return vaga;
		};
	}

	public DataFetcher<Vaga> iniciar() {
		return dataFetchingEnvironment -> {

			Integer vagaId = dataFetchingEnvironment.getArgument("id");

			Vaga vaga = vagaFacade.buscarPorId(vagaId.longValue());

			vaga.iniciar();

			return vaga;
		};
	}

	public DataFetcher<Vaga> finalizarVaga() {
		return dataFetchingEnvironment -> {

			Integer vagaId = dataFetchingEnvironment.getArgument("id");

			Vaga vaga = vagaFacade.buscarPorId(vagaId.longValue());

			vaga.finalizarVaga();

			return vaga;
		};
	}

	public DataFetcher<Vaga> cancelarVaga() {
		return dataFetchingEnvironment -> {

			Integer vagaId = dataFetchingEnvironment.getArgument("id");

			Vaga vaga = vagaFacade.buscarPorId(vagaId.longValue());

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

			Map<Long, Integer> result = Maps.newHashMap();

			for (Vaga vaga : vagaFacade.buscarPorFiltro(filtro)) {

				for (Candidato candidatoSelecionado : vaga.getCandidatos()) {

					Long id = candidatoSelecionado.getProfissional().getId();

					if (!result.containsKey(id)) {
						result.put(id, 0);
					}

					result.put(id, result.get(id) + 1);
				}
			}

			return result.entrySet().stream().map(a -> new VagaPorCandidato(a.getKey(), a.getValue())).collect(Collectors.toList());
		};
	}

}