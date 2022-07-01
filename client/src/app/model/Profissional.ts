import { Deserializable } from './Deserializable';
import { Experiencia } from './Experiencia';

export class Profissional implements Deserializable {

    nome: string;
    sobrenome: string;
    id: number;
    titulo: string;
    experiencias: Experiencia[];
    dataContato: Date;
    dataComeco: Date;
    email: string;
    avatar: string;
    profileRating: number;

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

        this.gerarRatingProfile();

        return this;
    }

    private gerarRatingProfile(): void {

        let total = 0;

        if (this.avatar) {
            total += 1;
        }

        if (this.experiencias && this.experiencias.length > 0) {
            total += 1;
        }

        this.profileRating = total / 2;
    }

    contemNomes(itens: string[]): boolean {

        for (let index = 0; index < itens.length; index++) {
            const element = itens[index].toLowerCase();
            if (this.nome.toLowerCase().indexOf(element) == -1 && this.sobrenome.toLowerCase().indexOf(element) == -1) {
                return false;
            }
        }

        return true;
    }

}
