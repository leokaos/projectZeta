import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/model/Evento';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-evento-panel',
  templateUrl: './evento-panel.component.html',
  styleUrls: ['./evento-panel.component.css']
})
export class EventoPanelComponent implements AfterViewInit {

  @Input()
  private id: String;

  @Input()
  private tipo: String;

  displayedColumns: string[] = ['dataEvento', 'operacao'];

  dataSource: MatTableDataSource<Evento> = new MatTableDataSource();

  constructor(private eventoService: EventoService) { }

  ngAfterViewInit() {

    let filtro = {
      'idEntidade': this.id,
      'tipoEntidade': this.tipo
    };

    this.eventoService.buscarPorFiltro(filtro).subscribe(
      (result: Evento[]) => {
        this.dataSource.data = this.eventoService.assemble(result);
      }
    );

  }

}
