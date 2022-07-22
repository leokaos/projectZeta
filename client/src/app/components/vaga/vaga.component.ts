import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Empresa } from "@app/model/Empresa";
import { Qualificacao } from "@app/model/Qualificacao";
import { Vaga } from "@app/model/Vaga";
import { EmpresaService } from "@app/services/empresa.service";
import { VagaService } from "@app/services/vaga.service";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { gql } from 'graphql-tag';
import { Apollo } from "apollo-angular";
import { QualificacaoService } from "@app/services/qualificacao.service";
import { MatTable, MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-vaga',
  templateUrl: './vaga.component.html',
  styleUrls: ['./vaga.component.scss']
})
export class VagaComponent implements OnInit {

  vaga: Vaga = new Vaga();

  carregado: boolean = false;

  @ViewChild(MatTable)
  table: MatTable<Qualificacao>;

  empresas: Empresa[] = [];
  filteredEmpresas: Observable<Empresa[]>;

  qualificacoes: Qualificacao[] = [];
  colunasExigencias = ['nome', 'remover'];

  empresaFormControl: FormControl = new FormControl();
  exigenciaFormControl: FormControl = new FormControl();

  constructor(private vagaService: VagaService,
    private empresaService: EmpresaService,
    private qualificacaoService: QualificacaoService,
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('id');

    this.empresaService.listAll().subscribe(empresas => {

      this.empresas = this.empresaService.assemble(empresas);

      if (id) {

        this.vagaService.buscarPorId(id).subscribe(vaga => {
          this.vaga = new Vaga().deserialize(vaga);
          this.empresaFormControl.setValue(this.vaga.empresa);
          this.carregado = true;
        });

      } else
        this.carregado = true;
    });

    this.filteredEmpresas = this.empresaFormControl.valueChanges.pipe(map(value => this.buscarEmpresa(value)));

    this.exigenciaFormControl.valueChanges.subscribe(value => this.buscarQualificacao(value));
  }

  public selectEmpresa() {
    this.vaga.empresa = this.empresaFormControl.value;
  }

  public displayEmpresa(empresa: Empresa) {
    return empresa ? empresa.nome : '';
  }

  public getStatusLabel(status: string) {
    return Vaga.LABEL_STATUS[status];
  }

  public buscarEmpresa(busca: String) {

    if (!busca || typeof busca !== 'string') {
      return this.empresas;
    }

    return this.empresas.filter((empresa: Empresa) => empresa.search(busca));
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

  public displayQualificacao(qualificacao: Qualificacao) {
    return qualificacao ? qualificacao.fullName() : '';
  }

  public selectQualificacao() {
    this.vaga.exigencias.push(this.exigenciaFormControl.value);
    this.exigenciaFormControl.reset();
    this.table.dataSource = new MatTableDataSource(this.vaga.exigencias);
  }

  public removerExigencia(index: number) {
    this.vaga.exigencias.splice(index, 1);
    this.exigenciaFormControl.reset();
    this.table.dataSource = new MatTableDataSource(this.vaga.exigencias);
  }

  public buscarQualificacao(query: string) {

    this.apollo.watchQuery<any>({
      query: BUSCAR_QUALIFICACAO,
      variables: { query: query }
    }).valueChanges.subscribe(({ data }) => {
      this.qualificacoes = this.qualificacaoService.assemble(data['qualificacaoPorQuery']);
    });

  }

  public salvar() {

    this.vagaService.salvar(this.vaga).subscribe(
      (data: any) => {
        this.router.navigate(['vagas']);
        this.snackBar.open('Vaga salva com sucesso!', 'Fechar');
      },
      (err: any) => { this.snackBar.open(err.error.message, 'Fechar'); });
  }

}

export const BUSCAR_QUALIFICACAO = gql`
  query buscarQualificacaoPorQuery($query: String) {
    qualificacaoPorQuery(query: $query){
      descricao,
      versao,
      id
    }
  }
`