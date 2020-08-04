import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from '@app/model/Empresa';
import { EmpresaService } from '@app/services/empresa.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-empresas',
  templateUrl: './list-empresas.component.html',
  styleUrls: ['./list-empresas.component.css']
})
export class ListEmpresasComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'remover'];
  dataSource: MatTableDataSource<Empresa> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  indexLoading: number;

  empresas: Empresa[] = [];

  constructor(private empresaService: EmpresaService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.empresaService.listAll().subscribe((innerEmpresas: Empresa[]) => {

      this.empresas = this.empresaService.assemble(innerEmpresas);

      this.dataSource = new MatTableDataSource(this.empresas);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public remover(id: String): void {
    this.empresaService.remover(id).subscribe(
      (data: any) => {

        this.dataSource = new MatTableDataSource(this.dataSource.data.filter(x => x.id !== id));

        this.snackBar.open('Sucesso!', 'Fechar');
      },
      (err: any) => {
        this.snackBar.open(err.error.message, 'Fechar');
      }
    );
  }

  public adicionarEmpresa(): void {
    this.dataSource.data = this.dataSource.data.concat(new Empresa());
  }

  public salvar(i: number): void {
    this.indexLoading = i;
    this.empresaService.salvar(this.dataSource.data[i]).subscribe((empresa: Empresa) => {
      this.dataSource.data[i] = empresa;
      this.dataSource._updateChangeSubscription();
      this.indexLoading = null;
      this.empresas.push(empresa);
    });
  }

  public cancelar(i: number): void {
    this.dataSource.data.splice(i, 1);
    this.dataSource._updateChangeSubscription();
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

}
