import { Categoria } from './Categoria';
import { Qualificacao } from './Qualificacao';

describe('Qualificacao', () => {

    it('should assemble', () => {

        let spyOnDeserializeCategory = spyOn(Categoria.prototype, 'deserialize').and.callThrough();

        let rawInput = { 'descricao': 'categoria 1', 'id': 123 };

        let qualificacao = new Qualificacao().deserialize(rawInput);

        expect(qualificacao.id).toBe(123);
        expect(spyOnDeserializeCategory).toHaveBeenCalledTimes(0);
    });

    it('should assemble with a category', () => {

        let spyOnDeserializeCategory = spyOn(Categoria.prototype, 'deserialize').and.callThrough();

        let rawInput = { 'descricao': 'categoria 1', 'id': 123, categoria: { 'id': 123 } };

        let qualificacao = new Qualificacao().deserialize(rawInput);

        expect(qualificacao.id).toBe(123);
        expect(spyOnDeserializeCategory).toHaveBeenCalledTimes(1);
    });

});