import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vaga } from '@app/model/Vaga';
import { VagaService } from '@app/services/vaga.service';

@Component({
  selector: 'app-panel-vagas',
  templateUrl: './panel-vagas.component.html',
  styleUrls: ['./panel-vagas.component.scss']
})
export class PanelVagasComponent implements OnInit {

  vagas: Vaga[] = [];

  displayedColumns: string[] = ['titulo', 'diasDesdeEntrada'];

  constructor(private vagaService: VagaService, private router: Router) { }

  ngOnInit(): void {

    this.vagaService.buscarPorFiltro({ "status": 'NOVA' }).subscribe(
      (innerVagas: Vaga[]) => {
        this.vagas = this.vagaService.assemble(innerVagas);
      });

  }

  showVaga(vaga: Vaga) {
    this.router.navigateByUrl("vaga/" + vaga.id);
  }

}
