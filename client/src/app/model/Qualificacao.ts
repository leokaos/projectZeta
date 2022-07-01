import { Categoria } from './Categoria';
import { Deserializable } from './Deserializable';
import { Equivalencia } from './Equivalencia';

export class Qualificacao implements Deserializable {

    descricao: string = '';
    versao: string = '';
    id?: number;
    equivalencias: Equivalencia[] = [];
    categoria: Categoria = new Categoria();

    deserialize(input: any): this {
        Object.assign(this, input);

        if (input.categoria != undefined) {
            this.categoria = new Categoria().deserialize(input.categoria);
        }

        return this;
    }

    public fullName() {
        return this.descricao + ' ' + this.versao;
    }

}
