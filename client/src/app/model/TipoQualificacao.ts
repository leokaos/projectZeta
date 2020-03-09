import { Deserializable } from './Deserializable';
import { Qualificacao } from './Qualificacao';

export class TipoQualificacao implements Deserializable {

    descricao: string;
    id: string;
    qualificacoes: Qualificacao[] = [];

    public porcentagemEquivalentes() {

        if (this.qualificacoes.length == 0 || this.qualificacoes == undefined) {
            return 0;
        }

        let totalComEquivalentes: number = this.qualificacoes.filter(q => q.equivalencias.length > 0).length;
        return totalComEquivalentes / this.qualificacoes.length;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}
