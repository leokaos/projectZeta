import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-evento-entidade',
  templateUrl: './evento-entidade.component.html',
  styleUrls: ['./evento-entidade.component.scss']
})
export class EventoEntidadeComponent {

  constructor(public dialog: MatDialogRef<EventoEntidadeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public onCancelar(): void {
    this.closeDialog();
  }

  private closeDialog(): void {
    this.dialog.close();
  }

}
