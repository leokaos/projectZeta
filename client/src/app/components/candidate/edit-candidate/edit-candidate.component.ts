import { Candidato } from '@app/model/Candidato';
import { Qualificacao } from '@model/Qualificacao';
import { QualificacaoService } from '@services/qualificacao.service';
import { MatSnackBar, MatTableDataSource } from '@angular/material';

import { Component, OnInit } from '@angular/core';
import { CandidatoService } from '@app/services/candidato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Experiencia } from '@app/model/Experiencia';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.css']
})
export class EditCandidateComponent implements OnInit {

  candidato: Candidato = new Candidato();
  qualificacoes: Qualificacao[] = [];
  dataSource: MatTableDataSource<Experiencia> = new MatTableDataSource<Experiencia>();

  displayedColumns: string[] = ['qualificacao', 'tempo', 'delete'];

  constructor(
    private qualificacaoService: QualificacaoService,
    private candidatoService: CandidatoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private apollo: Apollo) {

  }

  ngOnInit() {

    this.apollo.watchQuery(
      {
        query: EDIT_CANDIDATE_QUERY,
        variables: {
          "id": this.route.snapshot.paramMap.get("id"),
        }
      }).valueChanges.subscribe(
        (result: any) => {
          this.qualificacoes = this.qualificacaoService.assemble(result.data.todasAsQualificacoes);
          this.candidato = new Candidato().deserialize(result.data.candidatoPorId);
          this.dataSource.data = this.candidato.experiencias;
        });
  }

  public salvar() {

    let errorHandler = (err: any) => {
      this.snackBar.open(err.error.message, 'Fechar');
    };

    let successHandler = (data: any) => {
      this.router.navigate(['candidatos']);
      this.snackBar.open('Candidato salvo com sucesso!', 'Fechar');
    };

    if (this.candidato.id != null) {
      this.candidatoService.atualizar(this.candidato).subscribe(successHandler, errorHandler);
    } else {
      this.candidatoService.salvar(this.candidato).subscribe(successHandler, errorHandler);
    }

  }

  public adicionarExperiencia(): void {
    this.candidato.experiencias.push(new Experiencia());
    this.dataSource.data = this.candidato.experiencias;
  }

  public removerExperiencia(index: number): void {
    this.candidato.experiencias.splice(index, 1);
    this.dataSource.data = this.candidato.experiencias;
  }

}

export const EDIT_CANDIDATE_QUERY = gql`
query EditCandidate($id: String!) {
  todasAsQualificacoes {
    descricao
    versao
    id
  }
  candidatoPorId(id: $id) {
    nome
    sobrenome
    id
    titulo
    email
    experiencias {
      qualificacao {
        descricao
        versao
        id
      }
      tempo
    }
  }
}
`;
