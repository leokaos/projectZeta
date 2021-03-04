import { Equivalencia } from "./Equivalencia";
import { Qualificacao } from "./Qualificacao";

describe('Equivalencia', () => {

    it('should assemble', () => {

        let spyOnDeserializeQualificacao = spyOn(Qualificacao.prototype, 'deserialize').and.callThrough();

        let rawInput = { valor: 100, destino: {} };

        let equivalencia = new Equivalencia().deserialize(rawInput);

        expect(equivalencia.valor).toBe(100);
        expect(spyOnDeserializeQualificacao).toHaveBeenCalledTimes(1);
    });

    it('should assemble without destino', () => {

        let spyOnDeserializeQualificacao = spyOn(Qualificacao.prototype, 'deserialize').and.callThrough();

        let rawInput = { valor: 100 };

        let equivalencia = new Equivalencia().deserialize(rawInput);

        expect(equivalencia.valor).toBe(100);
        expect(spyOnDeserializeQualificacao).not.toHaveBeenCalled();
    });

});