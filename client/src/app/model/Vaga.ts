import { Deserializable } from './Deserializable';
import { Periodo } from './Periodo';
import { Empresa } from './Empresa';
import { Qualificacao } from './Qualificacao';
import { Profissional } from './Profissional';
import { Candidato } from './Candidato';

export class Vaga implements Deserializable {

    status: string = 'NOVA';
    titulo: string;
    descricao: string;
    periodo: Periodo = new Periodo();
    empresa: Empresa = new Empresa();
    dataEntrada: Date;
    tags: string[] = [];
    id: number;
    contatoTelefone: string;
    contatoEmail: string;
    candidatos: Candidato[] = [];
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

        if (input.candidatos) {

            this.candidatos = [];

            for (let item of input.candidatos) {
                this.candidatos.push(new Candidato().deserialize(item));
            }

            this.candidatos = this.candidatos.sort((n1: any, n2: any) => n2.pontuacao - n1.pontuacao);
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
