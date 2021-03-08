import { AfterContentInit, Component, OnInit, ViewChild } from "@angular/core";
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { MatDialog } from "@angular/material/dialog";
import { MatGridList } from "@angular/material/grid-list";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Categoria } from "@app/model/Categoria";
import { Qualificacao } from "@app/model/Qualificacao";
import { CategoriaService } from "@app/services/categoria.service";
import { QualificacaoService } from "@app/services/qualificacao.service";
import { CategoriaComponent } from "../categoria/categoria.component";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit, AfterContentInit {

  categorias: Categoria[] = [];

  @ViewChild('grid', { static: false })
  grid: MatGridList;

  gridByBreakpoint = { xl: 3, lg: 3, md: 2, sm: 1, xs: 1 };

  constructor(private categoriaService: CategoriaService, private qualificacaoService: QualificacaoService, private mediaObserver: MediaObserver, private snackBar: MatSnackBar, public dialog: MatDialog) {

  }

  ngAfterContentInit(): void {
    this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      this.grid.cols = this.gridByBreakpoint[change[0].mqAlias];
    });
  }

  ngOnInit(): void {

    this.categoriaService.listAll().subscribe(
      (innerCategorias: Categoria[]) => {

        this.categorias = this.categoriaService.assemble(innerCategorias);

        this.categorias.forEach(categoria => {
          this.qualificacaoService.buscarPorFiltro({ 'categoria.id': categoria.id }).subscribe(
            (qualificacoes: Qualificacao[]) => categoria.qualificacoes = this.qualificacaoService.assemble(qualificacoes)
          );
        });

      });

  }

  public criarCategoria(): void {

    const dialogRef = this.dialog.open(CategoriaComponent, { width: '700px' });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }

  public delete(id: string): void {

    this.categoriaService.remove(id).subscribe(
      (data: any) => {
        this.ngOnInit();
      },
      (err: any) => {
        this.snackBar.open(err.error.message, 'Fechar');
      });
  }

}