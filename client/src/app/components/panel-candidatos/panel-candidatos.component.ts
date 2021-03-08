import { AfterContentInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-candidatos',
  templateUrl: './panel-candidatos.component.html',
  styleUrls: ['./panel-candidatos.component.css']
})
export class PanelCandidatosComponent implements AfterContentInit, OnInit {

  nome: String;

  constructor() { }

  ngOnInit(): void {
    this.nome = 'Candidatos';
  }

  ngAfterContentInit(): void { }


}
