import { Deserializable } from './Deserializable';

export class Evento implements Deserializable {

    dataEvento: Date;
    operacao: string;
    entidade: string;

    deserialize(input: any): this {

        Object.assign(this, input);

        if (input['data-evento'] != undefined) {
            this.dataEvento = new Date(input['data-evento']);
        }

        return this;
    }

}
