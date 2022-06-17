package org.leo.projectzeta.config.graphql;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import graphql.GraphQL;
import graphql.execution.AsyncExecutionStrategy;
import graphql.schema.GraphQLScalarType;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.RuntimeWiring.Builder;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;

import org.leo.projectzeta.config.graphql.types.DateCoercing;
import org.leo.projectzeta.config.graphql.types.TempoCoercing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.URL;

import static graphql.schema.idl.TypeRuntimeWiring.newTypeWiring;

@Component
public class GraphQLComponent {

	@Autowired
	private GraphQLDataFetchers graphQLDataFetchers;

	@Autowired
	private TempoCoercing tempoCoercing;

	@Autowired
	private DateCoercing dateCoercing;

	@Value("${schema.resource.name}")
	private String schemaResourceName;

	private GraphQL graphQL;

	@Bean
	public GraphQL graphQL() {
		return graphQL;
	}

	@PostConstruct
	public void init() throws IOException {

		URL url = Resources.getResource(schemaResourceName);

		GraphQLSchema schema = buildSchema(Resources.toString(url, Charsets.UTF_8));

		AsyncExecutionStrategy mutationStrategy = new AsyncExecutionStrategy(new CustomGraphqlExceptionHandler());

		this.graphQL = GraphQL.newGraphQL(schema).mutationExecutionStrategy(mutationStrategy).build();
	}

	private GraphQLSchema buildSchema(String sdl) {
		return new SchemaGenerator().makeExecutableSchema(new SchemaParser().parse(sdl), buildWiring());
	}

	private RuntimeWiring buildWiring() {

		Builder builder = RuntimeWiring.newRuntimeWiring();

		builder.type(newTypeWiring("Query").dataFetcher("categoriaPorId", graphQLDataFetchers.getCategoriaByIdFetcher()));
		builder.type(newTypeWiring("Query").dataFetcher("todasAsCategorias", graphQLDataFetchers.getTodasAsCategoriasFetcher()));
		builder.type(newTypeWiring("Query").dataFetcher("candidatoPorId", graphQLDataFetchers.getProfissionalPorIdFetcher()));
		builder.type(newTypeWiring("Query").dataFetcher("todasAsQualificacoes", graphQLDataFetchers.getTodasAsQualificacoes()));
		builder.type(newTypeWiring("Query").dataFetcher("todosOsCandidatos", graphQLDataFetchers.getTodosOsCandidatos()));
		builder.type(newTypeWiring("Query").dataFetcher("todasAsEmpresas", graphQLDataFetchers.todasAsEmpresas()));
		builder.type(newTypeWiring("Query").dataFetcher("vagasPorCandidato", graphQLDataFetchers.vagasPorCandidato()));
		builder.type(newTypeWiring("Query").dataFetcher("qualificacaoPorId", graphQLDataFetchers.getQualificacaoPorId()));

		builder.type(newTypeWiring("Mutation").dataFetcher("selecionarCandidatos", graphQLDataFetchers.selecionarCandidatos()));
		builder.type(newTypeWiring("Mutation").dataFetcher("iniciarEntrevistas", graphQLDataFetchers.iniciarEntrevistas()));
		builder.type(newTypeWiring("Mutation").dataFetcher("iniciar", graphQLDataFetchers.iniciar()));
		builder.type(newTypeWiring("Mutation").dataFetcher("finalizarVaga", graphQLDataFetchers.finalizarVaga()));
		builder.type(newTypeWiring("Mutation").dataFetcher("cancelarVaga", graphQLDataFetchers.cancelarVaga()));

		builder.scalar(GraphQLScalarType.newScalar().name("Tempo").clearDirectives().coercing(tempoCoercing).build());
		builder.scalar(GraphQLScalarType.newScalar().name("Date").clearDirectives().coercing(dateCoercing).build());

		return builder.build();
	}
}