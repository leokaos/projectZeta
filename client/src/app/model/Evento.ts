import { Deserializable } from './Deserializable';


export class Evento implements Deserializable {

    dataEvento: Date;
    operacao: String;

    deserialize(input: any): this {

        Object.assign(this, input);

        if (input.dataEvento != undefined){
            this.dataEvento = new Date(input.dataEvento);
        }

        return this;
    }

}
