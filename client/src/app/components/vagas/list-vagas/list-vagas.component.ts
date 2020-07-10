import { Component, OnInit } from '@angular/core';
import { VagaService } from '@app/services/vaga.service';
import { Vaga } from '@app/model/Vaga';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ShowDialogTextoVagaComponent } from '../show-dialog-texto-vaga/show-dialog-texto-vaga.component';
import { WebSocketAPI } from '@app/services/websocket.service';
import { WorkflowVaga } from '@app/services/workflowVaga';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list-vagas',
  templateUrl: './list-vagas.component.html',
  styleUrls: ['./list-vagas.component.css']
})
export class ListVagasComponent implements OnInit {

  listas = {
    'NOVA': { 'data': [], 'connected': ['SELECIONANDO_CANDIDATOS', 'FINALIZADA'] },
    'SELECIONANDO_CANDIDATOS': { 'data': [], 'connected': 'ENTREVISTANDO' },
    'ENTREVISTANDO': { 'data': [], 'connected': 'AGUARDANDO_INICIO' },
    'AGUARDANDO_INICIO': { 'data': [], 'connected': 'INICIADA' },
    'INICIADA': { 'data': [], 'connected': 'FINALIZADA' },
    'FINALIZADA': { 'data': [], 'connected': '' }
  };

  labelStatus = Vaga.LABEL_STATUS;

  novasVagas: Vaga[] = [];

  constructor(private vagaService: VagaService, private dialog: MatDialog, private websocket: WebSocketAPI, private workflowVaga: WorkflowVaga, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {

    this.vagaService.listAll().subscribe(
      (vagas: Vaga[]) => {

        for (const vaga of vagas) {

          if (this.listas[vaga.status].data == undefined) {
            this.listas[vaga.status].data = [];
          }

          this.listas[vaga.status].data.push(new Vaga().deserialize(vaga));
          this.listas[vaga.status].data = this.listas[vaga.status].data.slice();
        }
      }
    );

    this.websocket.connect('/topic/vagas',
      (data: any) => {

        let obj: any = JSON.parse(data.body);

        for (let status in this.listas) {

          for (let index = 0; index < this.listas[status].data.length; index++) {

            let element = this.listas[status].data[index];

            if (element.id === obj.id) {

              let vaga = new Vaga().deserialize(obj);

              this.listas[status].data = this.listas[status].data.filter((x: any) => x.id !== obj.id);

              this.listas[obj.status].data.push(vaga);
              this.listas[obj.status].data = this.listas[obj.status].data.slice();

              this.novasVagas.push(vaga);
            }
          }
        }
      }
    );

  }

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer !== event.container) {

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)

      this.workflowVaga.process(event.item.data).subscribe(
        (result) => {
          this.snackBar.open('Vaga processada com Sucesso!', 'Fechar')
        }, (errors) => {

          for (let index = 0; index < errors.graphQLErrors.length; index++) {
            this.snackBar.open(errors.graphQLErrors[index].message, 'Fechar')
          }

          transferArrayItem(event.container.data, event.previousContainer.data, event.currentIndex, event.previousIndex)
        }
      );
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  public abrirTextoVaga(vaga: Vaga): void {
    this.dialog.open(ShowDialogTextoVagaComponent, { width: '1000px', height: '700px', data: { 'vaga': vaga } });
  }

  asIsOrder(a, b) {
    return 1;
  }

  isNova(id: String): boolean {
    return this.novasVagas.filter(vaga => vaga.id == id).length > 0;
  }

}
