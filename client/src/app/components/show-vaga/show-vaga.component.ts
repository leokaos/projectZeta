import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vaga } from '@app/model/Vaga';

@Component({
  selector: 'app-show-vaga',
  templateUrl: './show-vaga.component.html',
  styleUrls: ['./show-vaga.component.css']
})
export class ShowVagaComponent {

  vaga: Vaga;

  constructor(public dialogRef: MatDialogRef<ShowVagaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.vaga = data.vaga;
  }

  public onCancelar(): void {
    this.dialogRef.close();
  }

}
