import { Deserializable } from './Deserializable';

export class Tempo implements Deserializable {

    private static FORMATO = /(([1-9])*y)*(([1-9])*m)*/;

    private value: String;

    anos: number;
    meses: number;

    constructor() {

    }

    deserialize(input: any): this {

        let anos = input.match(Tempo.FORMATO)[2];
        let meses = input.match(Tempo.FORMATO)[4];

        this.anos = anos != undefined ? parseInt(anos) : 0;
        this.meses = meses != undefined ? parseInt(meses) : 0;

        return this;
    }

}
