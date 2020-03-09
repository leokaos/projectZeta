import { Deserializable } from './Deserializable';

export class Periodo implements Deserializable {

    dataInicial: Date;
    dataFinal: Date;

    constructor() {

    }

    public duracao(): number {
        return Math.ceil(Math.abs(this.dataFinal.getTime() - this.dataInicial.getTime()) / (1000 * 3600 * 24));
    }

    deserialize(input: any): this {

        if (input.dataInicial != undefined && input.dataInicial != null) {
            this.dataInicial = new Date(input.dataInicial);
        }

        if (input.dataFinal != undefined && input.dataFinal != null) {
            this.dataFinal = new Date(input.dataFinal);
        }

        return this;
    }

}
