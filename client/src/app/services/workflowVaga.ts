import { Injectable } from '@angular/core';
import { Vaga } from '@app/model/Vaga';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class WorkflowVaga {

  private endpoints: { [key: string]: any } = {};

  constructor(private apollo: Apollo) {
    this.endpoints['NOVA'] = SELECIONAR_CANDIDATOS;
    this.endpoints['SELECIONANDO_CANDIDATOS'] = INICIAR_ENTREVISTAS;
    this.endpoints['AGUARDANDO_INICIO'] = INICIAR;
    this.endpoints['INICIADA'] = FINALIZAR_VAGA;
  }

  process(vaga: Vaga) {

    return this.apollo.mutate(
      {
        mutation: this.endpoints[vaga.status],
        variables: {
          "id": vaga.id
        }
      });
  }

}

export const SELECIONAR_CANDIDATOS = gql`
mutation processar($id: Int) {
  selecionarCandidatos(id: $id) {
    id
  }
}
`;

export const INICIAR_ENTREVISTAS = gql`
mutation processar($id: Int) {
  iniciarEntrevistas(id: $id) {
    id
  }
}
`;

export const INICIAR = gql`
mutation processar($id: Int) {
  iniciar(id: $id) {
    id
  }
}
`;

export const FINALIZAR_VAGA = gql`
mutation processar($id: Int) {
  finalizarVaga(id: $id) {
    id
  }
}
`;

export const CANCELAR_VAGA = gql`
mutation processar($id: Int) {
  cancelarVaga(id: $id) {
    id
  }
}
`;
