import { Deserializable } from './Deserializable';
import { Periodo } from './Periodo';
import { Empresa } from './Empresa';
import { Candidato } from './Candidato';

export class Vaga implements Deserializable {

    status: string;
    titulo: string;
    descricao: string;
    periodo: Periodo;
    empresa: Empresa = new Empresa();
    dataEntrada: Date;
    tags: string[];
    id: string;
    contatoTelefone: string;
    contatoEmail: string;
    candidatosSelecionados: any;

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

        return this;
    }

    public diasDesdeEntrada(): number {
        return Math.ceil(Math.abs(new Date().getTime() - this.dataEntrada.getTime()) / (1000 * 3600 * 24));
    }

    public static LABEL_STATUS = {
        'NOVA': 'Nova',
        'SELECIONANDO_CANDIDATOS': 'Selecionando Candidatos',
        'ENTREVISTANDO': 'Entrevistando',
        'AGUARDANDO_INICIO': 'Aguardando Início',
        'INICIADA': 'Iniciada',
        'FINALIZADA': 'Finalizada'
    };

}
