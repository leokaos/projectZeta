import { Deserializable } from "./Deserializable";
import { Profissional } from "./Profissional";

export class Candidato implements Deserializable {

    profissional: Profissional;
    pontuacao: number;

    deserialize(input: any): this {

        Object.assign(this, input);

        if (input.profissional) {
            this.profissional = new Profissional().deserialize(input.profissional);
        }

        return this;
    }
}