import { AfterViewInit, Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Categoria } from "@app/model/Categoria";
import { Equivalencia } from "@app/model/Equivalencia";
import { Qualificacao } from "@app/model/Qualificacao";
import { CategoriaService } from "@app/services/categoria.service";
import { QualificacaoService } from "@app/services/qualificacao.service";
import { forkJoin } from "rxjs";

@Component({
  selector: 'app-qualificacao',
  templateUrl: './qualificacao.component.html',
  styleUrls: ['./qualificacao.component.css']
})
export class QualificacaoComponent implements AfterViewInit {

  qualificacao: Qualificacao = new Qualificacao();
  todasAsQualificacoesDoTipo: Qualificacao[] = [];
  categorias: Categoria[] = [];

  dataSource: MatTableDataSource<Equivalencia> = new MatTableDataSource<Equivalencia>();
  displayedColumns: string[] = ['qualificacao', 'valor', 'delete'];

  constructor(private qualificacaoService: QualificacaoService, private categoriaService: CategoriaService, private route: ActivatedRoute, public router: Router, public snackBar: MatSnackBar) {

  }

  ngAfterViewInit(): void {

    let id = this.route.snapshot.paramMap.get('id');

    if (id) {

      forkJoin([
        this.qualificacaoService.buscarPorId(id),
        this.categoriaService.listAll()
      ]).subscribe(result => {

        this.qualificacao = new Qualificacao().deserialize(result[0]);
        this.categorias = this.categoriaService.assemble(result[1]);

        this.carregarQualificacoesPorTipo(this.qualificacao.categoria);
      });
    }
  }

  public idComparator = function (option, value): boolean {
    return option.id === value.id;
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

  public adicionarEquivalencia(): void {
    this.qualificacao.equivalencias.push(new Equivalencia());
    this.dataSource.data = this.qualificacao.equivalencias;
  }

  public removerEquivalencia(index: number): void {
    this.qualificacao.equivalencias.splice(index, 1);
    this.dataSource.data = this.qualificacao.equivalencias;
  }

  public onChangeCategoria(categoria: Categoria): void {

    if (this.qualificacao.equivalencias.length != 0) {
      this.qualificacao.equivalencias = [];
    }

    this.carregarQualificacoesPorTipo(categoria);
  }

  private carregarQualificacoesPorTipo(categoria: Categoria): void {

    this.qualificacaoService.buscarPorFiltro({ 'categoria.id': categoria.id }).subscribe(
      (qualificacoes: Qualificacao[]) => {

        this.todasAsQualificacoesDoTipo = this.qualificacaoService.assemble(qualificacoes);
        this.todasAsQualificacoesDoTipo = this.todasAsQualificacoesDoTipo.filter(q => q.fullName() !== this.qualificacao.fullName());

        this.dataSource.data = this.qualificacao.equivalencias;
      });
  }

}