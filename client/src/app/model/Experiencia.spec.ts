import { Experiencia } from './Experiencia';
import { Qualificacao } from './Qualificacao';

describe('Experiencia', () => {

    it('should assemble with a qualification and time', () => {

        let spyOnDeserializeQualification = spyOn(Qualificacao.prototype, 'deserialize').and.callThrough();

        let rawInput = { qualificacao: { id: 123 }, tempo: '1y2m' };

        let experiencia = new Experiencia().deserialize(rawInput);

        expect(spyOnDeserializeQualification).toHaveBeenCalledTimes(1);

        expect(experiencia.qualificacao.id).toBe(123);
    });

    it('should assemble without a qualification and time', () => {

        let spyOnDeserializeQualification = spyOn(Qualificacao.prototype, 'deserialize').and.callThrough();

        let rawInput = {};

        new Experiencia().deserialize(rawInput);

        expect(spyOnDeserializeQualification).toHaveBeenCalledTimes(0);
    });



});