import { Deserializable } from './Deserializable';

export class Empresa implements Deserializable {

    nome: string;
    id: string;

    constructor() { }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

}
