import { Deserializable } from './Deserializable';
import { Qualificacao } from './Qualificacao';

export class Equivalencia implements Deserializable {

    destino: Qualificacao = new Qualificacao();
    valor: number;

    deserialize(input: any): this {
        Object.assign(this, input);

        if (input.destino != undefined){
            this.destino = new Qualificacao().deserialize(input.destino);
        }

        return this;
    }

}
