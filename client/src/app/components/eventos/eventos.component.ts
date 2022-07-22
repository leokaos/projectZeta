import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Evento } from '@app/model/Evento';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventoService } from '@app/services/evento.service';
import { MatDialog } from '@angular/material/dialog';
import { EventoEntidadeComponent } from '../evento-entidade/evento-entidade.component';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements AfterViewInit {

  @Input()
  id: String;

  @Input()
  tipo: String;

  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

  displayedColumns: string[] = ['dataEvento', 'operacao', 'entidade'];

  dataSource: MatTableDataSource<Evento> = new MatTableDataSource();

  constructor(private eventoService: EventoService, private dialog: MatDialog) { }

  ngAfterViewInit() {

    let filtro = {
      'idEntidade': this.id,
      'tipoEntidade': this.tipo
    };

    this.eventoService.buscarPorFiltro(filtro).subscribe(
      (result: Evento[]) => {
        this.dataSource.data = this.eventoService.assemble(result);
        this.dataSource.paginator = this.paginator;
      }
    );

  }

  open(entidade: any) {

    this.dialog.open(EventoEntidadeComponent, {
      width: '1000px',
      height: '700px',
      data: {
        'data': JSON.parse(entidade)
      }
    });

  }

}
