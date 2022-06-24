import { Profissional } from './Profissional';
import { Empresa } from './Empresa';
import { Periodo } from './Periodo';
import { Qualificacao } from './Qualificacao';
import { Vaga } from './Vaga';

describe('Vaga', () => {

    it('should assemble ONLY period', () => {

        let spyPeriodo = spyOn(Periodo.prototype, 'deserialize').and.callThrough();

        let rawInput = { periodo: { dataInicial: 946681200000, dataFinal: 978303600000 } };

        let vaga = new Vaga().deserialize(rawInput);

        expect(vaga.periodo.dataInicial).toEqual(new Date(1999, 11, 31, 23 ));
        expect(vaga.periodo.dataFinal).toEqual(new Date(2000, 11, 31, 23));
        expect(spyPeriodo).toHaveBeenCalledTimes(1);
    });

    it('should assemble ONLY dataEntrada', () => {

        let vaga = new Vaga().deserialize({ dataEntrada: 946681200000 });

        expect(vaga.dataEntrada).toEqual(new Date(1999, 11, 31, 23));
    });

    it('should assemble ONLY empresa', () => {

        let spyEmpresa = spyOn(Empresa.prototype, 'deserialize').and.callThrough();

        let vaga = new Vaga().deserialize({ empresa: {} });

        expect(vaga.empresa).not.toBeNull();
        expect(spyEmpresa).toHaveBeenCalledTimes(1);
    });

    it('should assemble ONLY candidatosSelecionados', () => {

        let spyCandidato = spyOn(Profissional.prototype, 'deserialize').and.callThrough();

        let vaga = new Vaga().deserialize({ candidatosSelecionados: [{ pontuacao: 100, candidato: {} }] });

        expect(vaga.candidatosSelecionados.length).toBe(1);
        expect(vaga.candidatosSelecionados[0].pontuacao).toBe(100);
        expect(spyCandidato).toHaveBeenCalledTimes(1);
    });

    it('should assemble ONLY exigencias', () => {

        let spyQualificacao = spyOn(Qualificacao.prototype, 'deserialize').and.callThrough();

        let vaga = new Vaga().deserialize({ exigencias: [{}, {}] });

        expect(vaga.exigencias.length).toBe(2);
        expect(spyQualificacao).toHaveBeenCalledTimes(2);
    });

    it('should return diasDesdeEntrada correctly', () => {

        let vaga = new Vaga().deserialize({ dataEntrada: 946681200000 });

        expect(vaga.diasDesdeEntrada()).toBeGreaterThan(3650);
    });

});