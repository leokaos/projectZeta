import { Component, OnInit, Output } from '@angular/core';
import { VagaService } from '@app/services/vaga.service';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaga } from '@app/model/Vaga';
import { Empresa } from '@app/model/Empresa';
import { EmpresaService } from '@app/services/empresa.service';
import { MatSnackBar, MatChipInputEvent } from '@angular/material';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-vagas',
  templateUrl: './edit-vagas.component.html',
  styleUrls: ['./edit-vagas.component.css']
})
export class EditVagasComponent implements OnInit {

  vaga: Vaga = new Vaga();

  carregado: boolean = false;

  empresas: Empresa[] = [];
  filteredEmpresas: Observable<Empresa[]>;

  editor = ClassicEditor;

  editVagaFormControl: FormControl = new FormControl();

  constructor(
    private vagaService: VagaService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private apollo: Apollo) {

  }

  ngOnInit() {

    this.apollo.watchQuery(
      {
        query: EDIT_VAGA_QUERY
      }).valueChanges.subscribe(
        (result: any) => {

          this.empresas = this.empresaService.assemble(result.data.todasAsEmpresas);

          this.filteredEmpresas = this.editVagaFormControl.valueChanges.pipe(map(value => this.buscarEmpresa(value)));

          this.vagaService.searchForId(this.route.snapshot.paramMap.get("id")).subscribe(
            (vaga: any) => {
              this.vaga = new Vaga().deserialize(vaga);
              this.editVagaFormControl.setValue(vaga.empresa);
              this.carregado = true;
            }
          );
        }
      );
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

export const EDIT_VAGA_QUERY = gql`
query EditVaga {
  todasAsEmpresas{
    id
    nome
  }
}
`;