import { AfterContentInit, Component, OnInit } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-panel-qualificacoes',
  templateUrl: './panel-qualificacoes.component.html',
  styleUrls: ['./panel-qualificacoes.component.css']
})
export class PanelQualificacoesComponent implements OnInit {

  nome: String;

  options: CloudOptions;
  data: CloudData[];

  constructor() { }

  ngOnInit(): void {

    Promise.resolve(null).then(() => {

      this.options = {
        width: 1,
        height: 200,
        overflow: false,
      };

      this.data = [
        { text: 'Kubernetes 1.14', weight: 2, color: '#162b77' },
        { text: 'HTML 5', weight: 2, color: '#162b77' },
        { text: 'JavaScript ES5', weight: 1, color: '#162b77' },
        { text: 'Java 8', weight: 2, color: '#162b77' },
        { text: 'Docker 1', weight: 2, color: '#162b77' },
        { text: 'CSS 3', weight: 1, color: '#162b77' },
        { text: 'Oracle 12c', weight: 1, color: '#162b77' },
        { text: 'Gradle 6', weight: 1, color: '#162b77' }
      ];

    });

  }

}
