import { AfterViewInit, Component, ComponentFactoryResolver, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { PanelCandidatosComponent } from '../panel-candidatos/panel-candidatos.component';
import { PanelQualificacoesComponent } from '../panel-qualificacoes/panel-qualificacoes.component';
import { PanelVagasComponent } from '../panel-vagas/panel-vagas.component';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements AfterViewInit {

  cards: any = [
    { title: 'Vagas em Aberto', cols: 1, rows: 1, class: PanelVagasComponent },
    { title: 'Candidatos Aguardando', cols: 1, rows: 1, class: PanelCandidatosComponent },
    { title: 'Hot Skills', cols: 1, rows: 1, class: PanelQualificacoesComponent },
    { title: 'Card 4', cols: 3, rows: 1, class: null }
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
