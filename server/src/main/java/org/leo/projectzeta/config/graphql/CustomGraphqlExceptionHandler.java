package org.leo.projectzeta.config.graphql;

import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import graphql.execution.DataFetcherExceptionHandler;
import graphql.execution.DataFetcherExceptionHandlerParameters;
import graphql.execution.DataFetcherExceptionHandlerResult;

public class CustomGraphqlExceptionHandler implements DataFetcherExceptionHandler {
    @Override
    public DataFetcherExceptionHandlerResult onException(DataFetcherExceptionHandlerParameters handlerParameters) {

        Throwable exception = handlerParameters.getException();

        GraphQLError error = GraphqlErrorBuilder.newError().message(exception.getMessage()).build();

        return DataFetcherExceptionHandlerResult.newResult().error(error).build();
    }
}
