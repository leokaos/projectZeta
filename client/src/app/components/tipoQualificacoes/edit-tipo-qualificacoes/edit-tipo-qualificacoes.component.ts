import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ListTipoQualificacoesComponent } from '../list-tipo-qualificacoes/list-tipo-qualificacoes.component';
import { TipoQualificacao } from '@app/model/TipoQualificacao';
import { TipoQualificacaoService } from '@app/services/tipoqualificacao.service';

@Component({
  selector: 'app-edit-tipo-qualificacoes',
  templateUrl: './edit-tipo-qualificacoes.component.html',
  styleUrls: ['./edit-tipo-qualificacoes.component.css']
})
export class EditTipoQualificacoesComponent implements OnInit {

  tipoQualificacao: TipoQualificacao = new TipoQualificacao();

  constructor(public dialogRef: MatDialogRef<ListTipoQualificacoesComponent>, private tipoQualificacaoService: TipoQualificacaoService) { }

  public onCriarClick(): void {
    this.tipoQualificacaoService.criar(this.tipoQualificacao).subscribe(
      (tipoQualificacao: TipoQualificacao) => {
        this.dialogRef.close();
      });
  }

  public onCancelar(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
