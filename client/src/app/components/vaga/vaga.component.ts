import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Empresa } from "@app/model/Empresa";
import { Vaga } from "@app/model/Vaga";
import { EmpresaService } from "@app/services/empresa.service";
import { VagaService } from "@app/services/vaga.service";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-vaga',
  templateUrl: './vaga.component.html',
  styleUrls: ['./vaga.component.scss']
})
export class VagaComponent implements OnInit {

  vaga: Vaga = new Vaga();

  carregado: boolean = false;

  empresas: Empresa[] = [];
  filteredEmpresas: Observable<Empresa[]>;

  editVagaFormControl: FormControl = new FormControl();

  constructor(private vagaService: VagaService, private empresaService: EmpresaService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('id');

    this.empresaService.listAll().subscribe(empresas => {

      this.empresas = this.empresaService.assemble(empresas);

      if (id) {

        this.vagaService.buscarPorId(id).subscribe(vaga => {
          this.vaga = new Vaga().deserialize(vaga);
          this.editVagaFormControl.setValue(this.vaga.empresa);
          this.carregado = true;
        });

      } else
        this.carregado = true;
    });

    this.filteredEmpresas = this.editVagaFormControl.valueChanges.pipe(map(value => this.buscarEmpresa(value)));
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

    this.vagaService.salvar(this.vaga).subscribe(
      (data: any) => {
        this.router.navigate(['vagas']);
        this.snackBar.open('Vaga salva com sucesso!', 'Fechar');
      },
      (err: any) => {
        this.snackBar.open(err.error.message, 'Fechar');
      });

  }

}