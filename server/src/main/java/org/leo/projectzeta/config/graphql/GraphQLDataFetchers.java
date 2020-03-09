package org.leo.projectzeta.config.graphql;

import java.util.List;

import org.leo.projectzeta.facade.CandidatoFacade;
import org.leo.projectzeta.facade.EmpresaFacade;
import org.leo.projectzeta.facade.QualificacaoFacade;
import org.leo.projectzeta.facade.TipoQualificacaoFacade;
import org.leo.projectzeta.facade.VagaFacade;
import org.leo.projectzeta.mensagens.VagasMensagens;
import org.leo.projectzeta.model.Candidato;
import org.leo.projectzeta.model.Empresa;
import org.leo.projectzeta.model.Qualificacao;
import org.leo.projectzeta.model.TipoQualificacao;
import org.leo.projectzeta.model.Vaga;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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

	public DataFetcher<Vaga> buscarVagaPorId() {
		return dataFetchingEnvironment -> {

			String vagaId = dataFetchingEnvironment.getArgument("id");

			return vagaFacade.buscarPorId(vagaId);
		};
	}

	public DataFetcher<List<Empresa>> todasAsEmpresas() {
		return dataFetchingEnvironment -> {
			return empresaFacade.listarTodos();
		};
	}

}