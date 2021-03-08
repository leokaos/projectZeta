import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Empresa } from "@app/model/Empresa";
import { Vaga } from "@app/model/Vaga";
import { EmpresaService } from "@app/services/empresa.service";
import { VagaService } from "@app/services/Vaga.service";
import { map, startWith } from 'rxjs/operators';
import { forkJoin } from "rxjs";

import { Observable } from "@apollo/client/core";

@Component({
  selector: 'app-vaga',
  templateUrl: './vaga.component.html',
  styleUrls: ['./vaga.component.css']
})
export class VagaComponent implements OnInit {

  vaga: Vaga = new Vaga();

  carregado: boolean = false;

  empresas: Empresa[] = [];
  filteredEmpresas: Observable<Empresa[]>;

  editVagaFormControl: FormControl = new FormControl();

  constructor(private vagaService: VagaService, private empresaService: EmpresaService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.filteredEmpresas = new Observable((observer) => {
      this.editVagaFormControl.valueChanges.pipe(map(value => this.buscarEmpresa(value)));
    });

    let id = this.route.snapshot.paramMap.get('id');

    if (id) {

      forkJoin([
        this.vagaService.buscarPorId(id),
        this.empresaService.listAll()
      ]).subscribe(result => {
        this.vaga = new Vaga().deserialize(result[0]);
        this.editVagaFormControl.setValue(this.vaga.empresa);
        this.empresas = this.empresaService.assemble(result[1]);
        this.carregado = true;
      });
    }

  }

  public selectEmpresa() {
    this.vaga.empresa = this.editVagaFormControl.value;
  }

  public displayEmpresa(empresa: Empresa) {
    return empresa ? empresa.nome : '';
  }

  public buscarEmpresa(busca: String) {

    if (!busca || typeof busca !== 'string') {
      return this.empresas;
    }

    return this.empresas.filter(
      (empresa: Empresa) => {
        return empresa.nome.toLowerCase().indexOf(busca.toLowerCase()) != -1;
      }
    );
  }

  public addTag(event: MatChipInputEvent): void {

    const value = event.value.trim();

    if ((value || '').trim() && this.vaga.tags.indexOf(value) == -1) {
      this.vaga.tags.push(value.trim());
    }

    if (event.input) {
      event.input.value = '';
    }
  }

  public removeTag(tag: string): void {
    this.vaga.tags = this.vaga.tags.filter(x => x !== tag);
  }

  public salvar() {

    /*this.vagaService.salvar(this.vaga).subscribe(
      (data: any) => {
        this.router.navigate(['vagas']);
        this.snackBar.open('Vaga salva com sucesso!', 'Fechar');
      },
      (err: any) => {
        this.snackBar.open(err.error.message, 'Fechar');
      });*/
    console.info(this.vaga);
  }

}