import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { QualificacaoService } from '@app/services/qualificacao.service';
import { Qualificacao } from '@app/model/Qualificacao';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoQualificacaoService } from '@app/services/tipoqualificacao.service';
import { TipoQualificacao } from '@app/model/TipoQualificacao';
import { Equivalencia } from '@app/model/Equivalencia';
import { MatTableDataSource, MatGridList, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-qualificacoes',
  templateUrl: './edit-qualificacoes.component.html',
  styleUrls: ['./edit-qualificacoes.component.css']
})
export class EditQualificacoesComponent implements AfterViewInit {

  qualificacao: Qualificacao = new Qualificacao();
  tipos: TipoQualificacao[] = [];

  displayedColumns: string[] = ['qualificacao', 'valor', 'delete'];
  todasAsQualificacoesDoTipo: Qualificacao[] = [];
  dataSource: MatTableDataSource<Equivalencia> = new MatTableDataSource<Equivalencia>();

  constructor(
    private qualificacaoService: QualificacaoService,
    private tipoQualificacaoService: TipoQualificacaoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {

  }

  ngAfterViewInit(): void {

    this.qualificacaoService.buscarPorId(this.route.snapshot.paramMap.get('id')).subscribe(
      (qualificacao: Qualificacao) => {
        this.qualificacao = new Qualificacao().deserialize(qualificacao);
        this.dataSource.data = this.qualificacao.equivalencias;

        this.tipoQualificacaoService.listAll().subscribe(
          (tipos: TipoQualificacao[]) => {
            this.tipos = this.tipoQualificacaoService.assemble(tipos);

            this.qualificacaoService.buscarPorFiltro({ 'tipo.id': this.qualificacao.tipo.id }).subscribe(
              (qualificacoes: Qualificacao[]) => {
                this.todasAsQualificacoesDoTipo = this.qualificacaoService.assemble(qualificacoes);
                this.todasAsQualificacoesDoTipo = this.todasAsQualificacoesDoTipo.filter(q => q.fullName() !== this.qualificacao.fullName());
              });
          });

      });

  }

  public adicionarEquivalencia(): void {
    this.qualificacao.equivalencias.push(new Equivalencia());
    this.dataSource.data = this.qualificacao.equivalencias;
  }

  public removerEquivalencia(index: number): void {
    this.qualificacao.equivalencias.splice(index, 1);
    this.dataSource.data = this.qualificacao.equivalencias;
  }

  public salvar(): void {
    this.qualificacaoService.salvar(this.qualificacao).subscribe(
      (data: any) => {
        this.router.navigate(['qualificacoes']);
        this.snackBar.open('Qualificacao salva com sucesso!', 'Fechar');
      },
      (err: any) => {
        this.snackBar.open(err.error.message, 'Fechar');
      });
  }
}

