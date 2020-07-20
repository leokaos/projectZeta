import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Vaga } from '@app/model/Vaga';

@Component({
  selector: 'app-show-dialog-texto-vaga',
  templateUrl: './show-dialog-texto-vaga.component.html',
  styleUrls: ['./show-dialog-texto-vaga.component.css']
})
export class ShowDialogTextoVagaComponent {

  vaga: Vaga;

  constructor(public dialogRef: MatDialogRef<ShowDialogTextoVagaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.vaga = data.vaga;
  }

  public onCancelar(): void {
    this.dialogRef.close();
  }

}
