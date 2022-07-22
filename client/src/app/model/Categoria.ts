import { Deserializable } from './Deserializable';
import { Qualificacao } from './Qualificacao';

export class Categoria implements Deserializable {

    descricao: string;
    id: number;
    qualificacoes: Qualificacao[] = [];

    constructor() { }

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
