import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { Profissional } from '@app/model/Profissional';
import { ProfissionalService } from '@app/services/profissional.service';

@Component({
  selector: 'app-profissionais',
  templateUrl: './profissionais.component.html',
  styleUrls: ['./profissionais.component.scss']
})
export class ProfissionaisComponent implements OnInit, AfterContentInit {

  @ViewChild('grid', { static: false })
  grid: MatGridList;

  gridByBreakpoint: { [key: string]: any } = { xl: 5, lg: 5, md: 3, sm: 2, xs: 1 };

  profissinais: Profissional[] = [];
  originalProfissionais: Profissional[] = [];

  constructor(private mediaObserver: MediaObserver, private profissionalService: ProfissionalService, private router: Router) {

  }

  ngAfterContentInit(): void {
    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    });
  }

  ngOnInit(): void {
    this.profissionalService.listAll().subscribe(
      (innerProfissionais: Profissional[]) => {
        this.originalProfissionais = this.profissionalService.assemble(innerProfissionais);
        this.profissinais = this.originalProfissionais;
      }
    );
  }

  public criarProfissional(): void {
    this.router.navigate(['/profissional']);
  }

  public onFiltroChange(event: Event): void {

    let filtro = event as InputEvent;

    if (filtro.data) {

      this.profissinais = this.originalProfissionais.filter(
        (profissional: Profissional) => {
          let itens = filtro.data!.split(' ').filter(x => x.trim() != '');
          return profissional.contemNomes(itens);
        }
      );

    }
    else {
      this.profissinais = this.originalProfissionais;
    }
  }

}
