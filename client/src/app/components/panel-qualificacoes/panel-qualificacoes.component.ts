import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Vaga } from '@app/model/Vaga';
import { VagaService } from '@app/services/Vaga.service';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-panel-qualificacoes',
  templateUrl: './panel-qualificacoes.component.html',
  styleUrls: ['./panel-qualificacoes.component.css']
})
export class PanelQualificacoesComponent implements OnInit {

  nome: String;
  carregado: boolean = false;

  options: CloudOptions;
  data: CloudData[];

  constructor(private vagaService: VagaService) { }

  ngOnInit(): void {

    this.vagaService.listAll().subscribe((vagas: Vaga[]) => {

      let innerVagas: Vaga[] = this.vagaService.assemble(vagas);

      let exigencias = innerVagas
        .reduce((c: any, v: any) => c.concat(v.exigencias), [])
        .reduce((c: any, v: any) => {
          let key = v.fullName();
          c[key] = (c[key] || []);
          c[key].push(v);
          return c
        }, {});

      this.options = { width: 1, height: 200, overflow: false, };

      let data = [];

      for (const property in exigencias) {
        data.push({ text: property, weight: exigencias[property].length, color: '#162b77' });
      }

      this.data = data;
      this.carregado = true;
    });

  }

}
