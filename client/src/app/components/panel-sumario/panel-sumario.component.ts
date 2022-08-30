import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-sumario',
  templateUrl: './panel-sumario.component.html',
  styleUrls: ['./panel-sumario.component.scss']
})
export class PanelSumarioComponent implements OnInit {

  indices = [
    { "value": 10, "text": "Vagas no Último Mês" },
    { "value": 20, "text": "Vagas no Último Mês" },
    { "value": 30, "text": "Vagas no Último Mês" },
    { "value": 40, "text": "Vagas no Último Mês" }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
