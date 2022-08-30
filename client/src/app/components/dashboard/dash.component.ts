import { AfterViewInit, Component, ComponentFactoryResolver, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { PanelProfissionaisComponent } from '../panel-profissionais/panel-profissionais.component';
import { PanelQualificacoesComponent } from '../panel-qualificacoes/panel-qualificacoes.component';
import { PanelSumarioComponent } from '../panel-sumario/panel-sumario.component';
import { PanelVagasComponent } from '../panel-vagas/panel-vagas.component';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements AfterViewInit {

  cards: any = [
    { title: 'Vagas em Aberto', cols: 1, rows: 1, class: PanelVagasComponent },
    { title: 'Profissionais Aguardando', cols: 1, rows: 1, class: PanelProfissionaisComponent },
    { title: 'Hot Skills', cols: 1, rows: 1, class: PanelQualificacoesComponent },
    { title: 'Big Picture', cols: 3, rows: 1, class: PanelSumarioComponent }
  ];

  @ViewChildren('dynamic', { read: ViewContainerRef })
  viewContainerRefList: QueryList<ViewContainerRef>;

  constructor(private factoryResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit(): void {

    Promise.resolve(null).then(() => {

      this.viewContainerRefList.map((vcr: ViewContainerRef, index: number) => {

        if (this.cards[index].class != null) {
          const factory = this.factoryResolver.resolveComponentFactory(this.cards[index].class);
          vcr.createComponent(factory);
        }

      });
    });

  }

}
