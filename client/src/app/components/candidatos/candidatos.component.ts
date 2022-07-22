import { Component, Input, OnInit } from '@angular/core';
import { Candidato } from '@app/model/Candidato';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.scss']
})
export class CandidatosComponent implements OnInit {

  @Input()
  candidatos: Candidato[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
