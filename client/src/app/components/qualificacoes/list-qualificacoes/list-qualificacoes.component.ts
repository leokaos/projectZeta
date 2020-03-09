import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { QualificacaoService } from '@app/services/qualificacao.service';
import { Qualificacao } from '@app/model/Qualificacao';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-qualificacoes',
  templateUrl: './list-qualificacoes.component.html',
  styleUrls: ['./list-qualificacoes.component.css']
})
export class ListQualificacoesComponent implements AfterViewInit {

  displayedColumns: string[] = ['descricao', 'versao', 'tipo', 'editar', 'remover'];
  dataSource: MatTableDataSource<Qualificacao> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private qualificacaoService: QualificacaoService, private snackBar: MatSnackBar) {

  }

  ngAfterViewInit(): void {

    this.qualificacaoService.listAll().subscribe(
      (todasQualificacoes: Qualificacao[]) => {

        this.dataSource = new MatTableDataSource(this.qualificacaoService.assemble(todasQualificacoes));

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public remover(id: String): void {
    this.qualificacaoService.remover(id).subscribe(
      (data: any) => {

        this.dataSource = new MatTableDataSource(this.dataSource.data.filter(x => x.id !== id));

        this.snackBar.open('Sucesso!', 'Fechar');
      },
      (err: any) => {
        this.snackBar.open(err.error.message, 'Fechar');
      }
    );
  }

}
