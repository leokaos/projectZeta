import { Candidato } from '@app/model/Candidato';
import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material';
import { CandidatoService } from '@app/services/candidato.service';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.css']
})
export class ListCandidateComponent implements OnInit, AfterContentInit {

  @ViewChild('grid', { static: false })
  grid: MatGridList;

  candidatos: Candidato[] = [];

  gridByBreakpoint = { xl: 6, lg: 6, md: 4, sm: 2, xs: 1 };

  constructor(private mediaObserver: MediaObserver, private candidatoService: CandidatoService, private apollo: Apollo) { }

  ngOnInit() {

    this.apollo.watchQuery(
      {
        query: LIST_CANDIDATE_QUERY
      }).valueChanges.subscribe(
        (result: any) => {
          this.candidatos = this.candidatoService.assemble(result.data.todosOsCandidatos);
        });
  }

  ngAfterContentInit(): void {

    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    });
  }
}

export const LIST_CANDIDATE_QUERY = gql`
query ListarCandidatos {
  todosOsCandidatos {
    nome
    sobrenome
    id
    titulo
  }
}
`;
