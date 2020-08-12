import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '@environment/environment'
import { HttpHeaders } from '@angular/common/http';
import { AuthenticateService } from './services/authenticate.service';

const uri = environment.REST_API_URL + '/graphql';

export function createApollo(httpLink: HttpLink, authenticateService: AuthenticateService) {
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
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthenticateService],
    },
  ],
})
export class GraphQLModule { }
