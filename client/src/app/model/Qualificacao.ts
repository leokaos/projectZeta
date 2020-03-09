import { Deserializable } from './Deserializable';
import { TipoQualificacao } from './TipoQualificacao';
import { Equivalencia } from './Equivalencia';

export class Qualificacao implements Deserializable {

    descricao: string;
    versao: string;
    id: string;
    equivalencias: Equivalencia[] = [];
    tipo: TipoQualificacao = new TipoQualificacao();

    deserialize(input: any): this {
        Object.assign(this, input);

        if (input.tipo != undefined) {
            this.tipo = new TipoQualificacao().deserialize(input.tipo);
        }

        return this;
    }

    public fullName() {
        return this.descricao + ' ' + this.versao;
    }

}
