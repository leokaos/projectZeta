import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from '@app/model/Empresa';
import { EmpresaService } from '@app/services/empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'remover'];

  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  dataSource: MatTableDataSource<Empresa> = new MatTableDataSource();
  empresas: Empresa[];

  indexLoading: number;

  constructor(private empresaService: EmpresaService, public snackBar: MatSnackBar) {

  }

  ngOnInit(): void {

    this.empresaService.listAll().subscribe((innerEmpresas: Empresa[]) => {

      this.empresas = this.empresaService.assemble(innerEmpresas);
      this.dataSource = new MatTableDataSource(this.empresas);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public adicionarEmpresa(): void {
    this.dataSource.data = this.dataSource.data.concat(new Empresa());
  }

  public onFiltroChange(filtro: string): void {

    if (filtro != "") {
      this.dataSource.data = this.empresas.filter(empresa => empresa.nome.toLowerCase().indexOf(filtro.toLowerCase()) != -1);
    }
    else {
      this.dataSource.data = this.empresas;
    }

    this.dataSource._updateChangeSubscription();
  }

  public remove(id: String): void {

    this.empresaService.remove(id).subscribe(
      (data: any) => {

        this.dataSource = new MatTableDataSource(this.dataSource.data.filter(x => x.id !== id));

        this.snackBar.open('Sucesso!', 'Fechar');
      },
      (err: any) => this.snackBar.open(err.error.message, 'Fechar')
    );

  }

  public save(i: number): void {

    this.indexLoading = i;

    this.empresaService.save(this.dataSource.data[i]).subscribe(
      (empresa: Empresa) => {
        this.dataSource.data[i] = empresa;
        this.dataSource._updateChangeSubscription();
        this.indexLoading = null;
        this.empresas.push(empresa);
      },
      (err: any) => {
        this.snackBar.open(err.error.message, 'Fechar');
        this.cancel(i);
      }
    );
  }

  public cancel(i: number): void {
    this.dataSource.data.splice(i, 1);
    this.dataSource._updateChangeSubscription();
  }

}
