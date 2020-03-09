import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { TipoQualificacaoService } from '@app/services/tipoqualificacao.service';
import { TipoQualificacao } from '@app/model/TipoQualificacao';
import { MatGridList, MatDialog, MatSnackBar } from '@angular/material';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { QualificacaoService } from '@app/services/qualificacao.service';
import { Qualificacao } from '@app/model/Qualificacao';
import { EditTipoQualificacoesComponent } from '@tipoQualificacoes/edit-tipo-qualificacoes/edit-tipo-qualificacoes.component';

@Component({
  selector: 'app-list-tipo-qualificacoes',
  templateUrl: './list-tipo-qualificacoes.component.html',
  styleUrls: ['./list-tipo-qualificacoes.component.css']
})
export class ListTipoQualificacoesComponent implements OnInit, AfterContentInit {

  tipoQualificacoes: TipoQualificacao[] = [];

  @ViewChild('grid', { static: false })
  grid: MatGridList;

  gridByBreakpoint = { xl: 2, lg: 2, md: 1, sm: 1, xs: 1 };

  constructor(
    private tipoQualificacaoService: TipoQualificacaoService,
    private qualificacaoService: QualificacaoService,
    private mediaObserver: MediaObserver,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.tipoQualificacaoService.listAll().subscribe(

      (innerTipoQualificacoes: TipoQualificacao[]) => {

        this.tipoQualificacoes = this.tipoQualificacaoService.assemble(innerTipoQualificacoes);

        this.tipoQualificacoes.forEach(tipo => {
          this.qualificacaoService.buscarPorFiltro({ 'tipo.id': tipo.id, 'maxResults': '10' }).subscribe(
            (qualificacoes: Qualificacao[]) => {
              tipo.qualificacoes = this.qualificacaoService.assemble(qualificacoes);
            }
          );
        });

      });

  }

  ngAfterContentInit(): void {
    this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      this.grid.cols = this.gridByBreakpoint[change[0].mqAlias];
    });
  }

  public criarTipoQualificacao(): void {

    const dialogRef = this.dialog.open(EditTipoQualificacoesComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  public delete(id: string): void {
    this.tipoQualificacaoService.remove(id).subscribe(
      (data: any) => {
        this.ngOnInit();
      },
      (err: any) => {
        this.snackBar.open(err.error.message, 'Fechar');
      });
  }

}
