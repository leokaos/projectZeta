import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { AuthenticateService } from './services/authenticate.service';
import { environment } from '@environment/environment';
import { HttpHeaders } from '@angular/common/http';

const uri = environment.REST_API_URL + '/graphql';

export function createApollo(httpLink: HttpLink, authenticateService: AuthenticateService): ApolloClientOptions<any> {
  return {
    link: httpLink.create(
      {
        uri: uri,
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + authenticateService.getUser().token
        })
      }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthenticateService],
    },
  ],
})
export class GraphQLModule { }
