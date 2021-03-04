import { Periodo } from './Periodo';

describe('Periodo', () => {

    it('should assemble', () => {

        let rawInput = { 'dataInicial': 946681200000, 'dataFinal': 978303600000 };

        let periodo = new Periodo().deserialize(rawInput);

        expect(periodo.dataInicial).toEqual(new Date(2000, 0, 1));
        expect(periodo.dataFinal).toEqual(new Date(2001, 0, 1));
        expect(periodo.duracao()).toBe(366);
    });

    it('should assemble WITHOUT any dates', () => {

        let rawInput = { 'dataInicial': null, 'dataFinal': null };

        let periodo = new Periodo().deserialize(rawInput);

        expect(periodo.dataInicial).toBeUndefined();
        expect(periodo.dataFinal).toBeUndefined();
    });

});