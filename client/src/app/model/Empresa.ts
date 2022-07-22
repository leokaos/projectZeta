import { Deserializable } from './Deserializable';

export class Empresa implements Deserializable {

    nome: string;
    id: string;

    constructor() { }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    search(query: string): boolean {
        return this.nome.toLowerCase().indexOf(query.toLowerCase()) != -1;
    }

}
