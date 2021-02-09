package org.leo.projectzeta.config.graphql;

import static org.leo.projectzeta.model.StatusVaga.ENTREVISTANDO;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.leo.projectzeta.config.graphql.types.VagaPorCandidato;
import org.leo.projectzeta.facade.CandidatoFacade;
import org.leo.projectzeta.facade.EmpresaFacade;
import org.leo.projectzeta.facade.QualificacaoFacade;
import org.leo.projectzeta.facade.TipoQualificacaoFacade;
import org.leo.projectzeta.facade.VagaFacade;
import org.leo.projectzeta.mensagens.VagasMensagens;
import org.leo.projectzeta.model.Candidato;
import org.leo.projectzeta.model.CandidatoSelecionado;
import org.leo.projectzeta.model.Empresa;
import org.leo.projectzeta.model.Qualificacao;
import org.leo.projectzeta.model.TipoQualificacao;
import org.leo.projectzeta.model.Vaga;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.common.collect.Maps;

import graphql.schema.DataFetcher;

@Component
public class GraphQLDataFetchers {

	@Autowired
	private TipoQualificacaoFacade tipoQualificacaoFacade;

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

	public DataFetcher<TipoQualificacao> getTipoQualificacaoByIdFetcher() {
		return dataFetchingEnvironment -> {
			String tipoQualificacaoId = dataFetchingEnvironment.getArgument("id");
			return tipoQualificacaoFacade.buscarPorId(tipoQualificacaoId);
		};
	}

	public DataFetcher<List<TipoQualificacao>> getTodosOsTiposDeQualificacoesFetcher() {
		return dataFetchingEnvironment -> {
			return tipoQualificacaoFacade.listarTodos();
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

				for (CandidatoSelecionado candidatoSelecionado : vaga.getCandidatosSelecionados()) {

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