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
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-vagas',
  templateUrl: './edit-vagas.component.html',
  styleUrls: ['./edit-vagas.component.css']
})
export class EditVagasComponent implements OnInit {

  vaga: Vaga = new Vaga();
  carregado: boolean = false;
  editVagaFormControl = new FormControl();

  empresas: Empresa[] = [];
  filteredEmpresas: Observable<Empresa[]>;

  editor = ClassicEditor;

  constructor(
    private vagaService: VagaService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private apollo: Apollo) {

  }

  ngOnInit() {

    /*this.apollo.watchQuery(
      {
        query: EDIT_VAGA_QUERY,
        variables: {
          "id": this.route.snapshot.paramMap.get("id"),
        }
      }).valueChanges.subscribe(
        (result: any) => {
          this.vaga = new Vaga().deserialize(result.data.buscarVagaPorId);
          this.empresas = this.empresaService.assemble(result.data.todasAsEmpresas);
          this.carregado = true;
        }
      );*/

    this.vaga = new Vaga().deserialize({ "id":"5d6fc63e2fa04f18c4c66cad", "empresa":{ "id":"5d6f66c4efcfe30a4cf1998e", "nome":"Bozo Inc" }, "status":"ENTREVISTANDO", "titulo":"Arquiteto Java", "descricao":"Churros are fried until they become crunchy, and may be sprinkled with sugar. The surface of a churro is ridged due to having been piped from a churrera, a syringe-like tool with a star-shaped nozzle. Churros are generally prisms in shape, and may be straight, curled or spirally twisted.  Like pretzels, churros are sold by street vendors, who may fry them freshly on the street stand and sell them hot. In Spain and much of Latin America, churros are available in cafes for breakfast, although they may be eaten throughout the day as a snack. Specialized churrerías can be found in the form of a shop or a trailer during the holiday period. In addition, countries like Colombia, Peru, Spain and Venezuela have churrerías throughout their streets. In Portugal, they are commonly eaten at carnivals, fairs and other celebrations, where they are made freshly at street stands.  The dough is a mixture of flour, water and salt. Some versions are made of potato dough.  Variations In Seville (Andalusia), the name calientes or calentitos de rueda is sometimes used instead of the word churro. These tend to refer to the thicker variant, called porra. Calientes are usually fried in the shape of a continuous spiral and cut into portions afterwards. The center of the spiral is thicker and softer, and for many a delicacy in itself. The standard churro is also sold under the name calentitos de papas, the name referring to the softer mashed potato–like texture.[4][5][6]  In parts of Eastern Andalusia, a much thinner dough is used, which does not allow for the typical ridges to be formed on the surface of the churro. The final result therefore has a smooth surface, and is more pliable and of a slightly thinner diameter than standard Spanish churros. Another difference is that sugar is never sprinkled on them, because the flavour is not considered suitable.  Filled, straight churros are found in Cuba (with fruit, such as guava), Brazil (with chocolate, doce de leite, among others), and in Argentina, Bolivia, Peru, Chile and Mexico (usually filled with dulce de leche or cajeta but also with chocolate and vanilla). In Colombia and Venezuela, churros are glazed with arequipe and sweetened condensed milk. In Spain, a considerably wider diameter is used to accommodate the filling. In Uruguay, churros can also come in a savoury version, filled with melted cheese.  In the Philippines, churros are typically straight, or bent into U-shapes or circular shapes. They are usually dusted with white sugar. Churros are almost always eaten with tsokolate drinks (a pairing known as churros con tsokolate), which can also serve as a dip. They are popular during the Christmas season.[7][8][9]  Churros in American theme parks and street fairs are most often rolled in cinnamon sugar or other flavored sugars.", "periodo":{ "dataInicial":1567534932414, "dataFinal":1575397332414 }, "dataEntrada":1568018514138, "contatoTelefone":"+49 1525 234 8042", "contatoEmail":"leokaos@gmail.com", "exigencias":[ { "id":"5d4960c64c353835e4453d1a", "descricao":"Oracle", "versao":"11g", "tipo":{ "id":"5d4960b64c353835e4453d19", "descricao":"Banco de Dados" }, "equivalencias":[ { "valor":100, "destino":{ "descricao":"Oracle", "id":"5d4998614c353822b4cb6000", "versao":"12c" } }, { "valor":100, "destino":{ "descricao":"MySQL", "id":"5d4998724c353822b4cb6002", "versao":"6.0" } }, { "valor":100, "destino":{ "descricao":"MySQL", "id":"5d49986e4c353822b4cb6001", "versao":"5.5" } } ] }, { "id":"5d4998614c353822b4cb6000", "descricao":"Oracle", "versao":"12c", "tipo":{ "id":"5d4960b64c353835e4453d19", "descricao":"Banco de Dados" }, "equivalencias":[ { "valor":80, "destino":{ "descricao":"Oracle", "id":"5d4960c64c353835e4453d1a", "versao":"11g" } } ] } ], "candidatosSelecionados":{ "180":{ "id":"5d40486f10794fef6bf3a4b5", "nome":"Leonardo", "sobrenome":"Otero", "titulo":"Desenvolvedor Java Senior", "email":"leokaos@gmail.com", "experiencias":[ { "qualificacao":{ "id":"5d4998614c353822b4cb6000", "descricao":"Oracle", "versao":"12c", "tipo":{ "id":"5d4960b64c353835e4453d19", "descricao":"Banco de Dados" }, "equivalencias":[ { "valor":80, "destino":{ "descricao":"Oracle", "id":"5d4960c64c353835e4453d1a", "versao":"11g" } } ] }, "tempo":"1y2m" } ] } }, "tags":[ "Angular 8", "Java", "FullStack" ] });

    this.carregado = true;

    this.empresas.push(new Empresa().deserialize({ 'id': '5d6f66c4efcfe30a4cf1998e', 'nome': 'Bozo Inc' }));
    this.empresas.push(new Empresa().deserialize({ 'id': '456', 'nome': 'ACME' }));
    this.empresas.push(new Empresa().deserialize({ 'id': '789', 'nome': 'Tairel' }));
    this.empresas.push(new Empresa().deserialize({ 'id': '147', 'nome': 'Cyberdyne Systems' }));

    this.filteredEmpresas = this.editVagaFormControl.valueChanges.pipe(map(value => this.filtroPorNome(value)));

    this.editVagaFormControl.setValue(this.vaga.empresa);
  }

  public displayEmpresa(empresa: Empresa) {
    return empresa != null ? empresa.nome : '';
  }

  private filtroPorNome(value: any): Empresa[] {

    let termo = value.nome != undefined ? value.nome : value;

    return this.empresas.filter(empresa => empresa.nome.toLowerCase().includes(termo.toLowerCase()));
  }

  public selectEmpresa() {
    this.vaga.empresa = this.editVagaFormControl.value;
  }

  public addTag(event: MatChipInputEvent): void {
    const value = event.value;

    if ((value || '').trim()) {
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
query EditVaga($id: String!) {
  buscarVagaPorId(id: $id) {
    id
    titulo
    descricao
    status
    periodo {
      dataInicial
      dataFinal
    }
    empresa {
      id
      nome
    }
  }
  todasAsEmpresas{
    id
    nome
  }
}
`;