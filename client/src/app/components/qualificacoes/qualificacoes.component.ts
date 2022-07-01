import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Qualificacao } from '@app/model/Qualificacao';
import { QualificacaoService } from '@app/services/qualificacao.service';

@Component({
  selector: 'app-qualificacoes',
  templateUrl: './qualificacoes.component.html',
  styleUrls: ['./qualificacoes.component.scss']
})
export class QualificacoesComponent implements AfterViewInit {

  dataSource: MatTableDataSource<Qualificacao> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  displayedColumns: string[] = ['descricao', 'versao', 'categoria', 'editar', 'remover'];

  constructor(private qualificacaoService: QualificacaoService, public snackBar: MatSnackBar) {

  }

  ngAfterViewInit(): void {

    this.qualificacaoService.listAll().subscribe(
      (todasQualificacoes: Qualificacao[]) => {

        this.dataSource = new MatTableDataSource(this.qualificacaoService.assemble(todasQualificacoes));

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public remover(id: number): void {

    this.qualificacaoService.remove(id).subscribe(
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
