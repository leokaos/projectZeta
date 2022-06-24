import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Evento } from '@app/model/Evento';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EventoService } from '@app/services/evento.service';

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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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

    this.dataSource.paginator = this.paginator;
  }

}
