import { Qualificacao } from './Qualificacao';
import { Deserializable } from './Deserializable';
import { Experiencia } from './Experiencia';

export class Candidato implements Deserializable {

    nome: string;
    sobrenome: string;
    id: string;
    titulo: string;
    experiencias: Experiencia[];
    dataContato: Date;
    dataComeco: Date;

    constructor() {
        this.experiencias = [];
    }

    deserialize(input: any): this {

        Object.assign(this, input);

        if (input.experiencias !== undefined && input.experiencias instanceof Array) {

            this.experiencias = [];

            for (let index = 0; index < input.experiencias.length; index++) {
                const element = input.experiencias[index];
                this.experiencias.push(new Experiencia().deserialize(element));
            }

        }

        if (this.experiencias == null) {
            this.experiencias = [];
        }

        if (input.dataContato != null) {
            this.dataContato = new Date(input.dataContato);
        }

        if (input.dataComeco != null) {
            this.dataComeco = new Date(input.dataComeco);
        }

        return this;
    }

}
