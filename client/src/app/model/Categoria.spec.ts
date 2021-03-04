import { Categoria } from "@app/model/Categoria";

describe('Categoria', () => {

    it('should return 0% qualifications with equivalence', () => {

        let rawInput = { "descricao": "categoria 1", "id": "123" };

        let categoria = new Categoria().deserialize(rawInput);

        expect(categoria.porcentagemEquivalentes()).toBe(0);
    });

    it('should return 50% qualifications with equivalence', () => {

        let rawInput = { "descricao": "categoria 1", "id": "123", "qualificacoes": [{ "equivalencias": [{ "id": "123" }] }, { "equivalencias": [] }] };

        let categoria = new Categoria().deserialize(rawInput);

        expect(categoria.porcentagemEquivalentes()).toBe(0.5);
    });


});