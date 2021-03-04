import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from '@app/model/Categoria';
import { CategoriaService } from '@app/services/categoria.service';
import { CategoriasComponent } from '@components/categorias/categorias.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {

  categoria: Categoria = new Categoria();

  constructor(public dialog: MatDialogRef<CategoriasComponent>, private categoriaService: CategoriaService, public snackBar: MatSnackBar) { }

  public onCriarClick(): void {

    this.categoriaService.criar(this.categoria).subscribe(
      (data) => {
        this.closeDialog();
      },
      (err) => {
        this.snackBar.open(err.error.message, 'Fechar');
      });

  }

  public onCancelar(): void {
    this.closeDialog();
  }

  private closeDialog(): void {
    this.dialog.close();
  }

}
