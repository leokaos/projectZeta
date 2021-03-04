import { Deserializable } from './Deserializable';
import { Qualificacao } from './Qualificacao';
import { Tempo } from './Tempo';

export class Experiencia implements Deserializable {

    qualificacao: Qualificacao;
    tempo: Tempo;

    constructor() {
        this.qualificacao = new Qualificacao();
    }

    deserialize(input: any): this {

        Object.assign(this, input);

        if (input.qualificacao != undefined && input.qualificacao != null) {
            this.qualificacao = new Qualificacao().deserialize(input.qualificacao);
        }

        if (input.tempo != undefined && input.tempo != null) {
            this.tempo = new Tempo().deserialize(input.tempo);
        }

        return this;
    }

}
