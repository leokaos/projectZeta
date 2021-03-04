import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { Candidato } from '@app/model/Candidato';
import { CandidatoService } from '@app/services/candidato.service';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.css']
})
export class CandidatosComponent implements OnInit, AfterContentInit {

  @ViewChild('grid', { static: false })
  grid: MatGridList;

  gridByBreakpoint = { xl: 5, lg: 5, md: 3, sm: 2, xs: 1 };

  candidatos: Candidato[] = [];
  originalCandidatos: Candidato[] = [];

  constructor(private mediaObserver: MediaObserver, private candidatoService: CandidatoService, private router: Router) {

  }

  ngAfterContentInit(): void {
    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    });
  }

  ngOnInit(): void {
    this.candidatoService.listAll().subscribe(
      (innerCandidatos: Candidato[]) => {
        this.originalCandidatos = this.candidatoService.assemble(innerCandidatos);
        this.candidatos = this.originalCandidatos;
      }
    );
  }

  public criarCandidato(): void {
    this.router.navigate(['/candidato']);
  }

  public onFiltroChange(filtro: string): void {

    if (filtro != '') {

      this.candidatos = this.originalCandidatos.filter(
        (candidato: Candidato) => {
          let itens = filtro.split(' ').filter(x => x.trim() != '');
          return candidato.contemNomes(itens);
        }
      );

    }
    else {
      this.candidatos = this.originalCandidatos;
    }
  }

}
