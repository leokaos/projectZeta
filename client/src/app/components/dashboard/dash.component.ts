import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewChecked, AfterViewInit, Component, ComponentFactoryResolver, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { PanelCandidatosComponent } from '../panel-candidatos/panel-candidatos.component';
import { PanelVagasComponent } from '../panel-vagas/panel-vagas.component';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements AfterViewInit {

  cards = [
    { title: 'Card 1', cols: 1, rows: 1, class: PanelVagasComponent },
    { title: 'Card 2', cols: 1, rows: 1, class: PanelVagasComponent },
    { title: 'Card 3', cols: 1, rows: 1, class: PanelVagasComponent },
    { title: 'Card 4', cols: 3, rows: 1, class: PanelCandidatosComponent }
  ];

  @ViewChildren('dynamic', { read: ViewContainerRef })
  viewContainerRefList: QueryList<ViewContainerRef>;

  constructor(private factoryResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit(): void {

    this.viewContainerRefList.map(
      (vcr: ViewContainerRef, index: number) => {
        const factory = this.factoryResolver.resolveComponentFactory(this.cards[index].class);
        vcr.createComponent(factory);
      }
    );

  }

}
