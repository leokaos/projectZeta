import { Deserializable } from './Deserializable';
import { Periodo } from './Periodo';
import { Empresa } from './Empresa';
import { Qualificacao } from './Qualificacao';
import { Profissional } from './Profissional';

export class Vaga implements Deserializable {

    status: string;
    titulo: string;
    descricao: string;
    periodo: Periodo;
    empresa: Empresa = new Empresa();
    dataEntrada: Date;
    tags: string[];
    id: number;
    contatoTelefone: string;
    contatoEmail: string;
    candidatosSelecionados: any;
    exigencias: Qualificacao[] = [];

    deserialize(input: any): this {

        Object.assign(this, input);

        if (input.periodo != undefined && input.periodo != null) {
            this.periodo = new Periodo().deserialize(input.periodo);
        }

        if (input.dataEntrada != undefined && input.dataEntrada != null) {
            this.dataEntrada = new Date(input.dataEntrada);
        }

        if (input.empresa != undefined && input.empresa != null) {
            this.empresa = new Empresa().deserialize(input.empresa);
        }

        this.candidatosSelecionados = [];

        if (input.candidatosSelecionados) {

            for (let item of input.candidatosSelecionados) {
                this.candidatosSelecionados.push({
                    "candidato": new Profissional().deserialize(item.candidato),
                    "pontuacao": item.pontuacao
                });
            }

            this.candidatosSelecionados = this.candidatosSelecionados.sort((n1: any, n2: any) => n2.pontuacao - n1.pontuacao);
        }

        this.exigencias = [];

        if (input.exigencias) {

            for (let exigencia of input.exigencias) {
                this.exigencias.push(new Qualificacao().deserialize(exigencia));
            }

        }

        return this;
    }

    public diasDesdeEntrada(): number {
        return Math.ceil(Math.abs(new Date().getTime() - this.dataEntrada.getTime()) / (1000 * 3600 * 24));
    }

    public static LABEL_STATUS: { [key: string]: string } = {
        'NOVA': 'Nova',
        'SELECIONANDO_CANDIDATOS': 'Selecionando Candidatos',
        'ENTREVISTANDO': 'Entrevistando',
        'AGUARDANDO_INICIO': 'Aguardando Início',
        'INICIADA': 'Iniciada',
        'FINALIZADA': 'Finalizada'
    };

}
