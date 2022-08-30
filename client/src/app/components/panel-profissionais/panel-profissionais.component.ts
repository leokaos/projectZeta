import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Profissional } from '@app/model/Profissional';
import { ProfissionalService } from '@app/services/profissional.service';

@Component({
  selector: 'app-panel-profissionais',
  templateUrl: './panel-profissionais.component.html',
  styleUrls: ['./panel-profissionais.component.scss']
})
export class PanelProfissionaisComponent implements OnInit {

  profissionais: Profissional[] = [];

  constructor(private profissionalService: ProfissionalService) { }

  ngOnInit(): void {
    this.profissionalService.buscarPorFiltro({ "status": "EM_CONTATO" }).subscribe(
      (innerProfissionais: Profissional[]) => {
        this.profissionais = this.profissionalService.assemble(innerProfissionais);
      });
  }

}
