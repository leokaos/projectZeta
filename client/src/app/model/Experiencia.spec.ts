import { Experiencia } from './Experiencia';
import { Qualificacao } from './Qualificacao';
import { Tempo } from './Tempo';

describe('Experiencia', () => {

    it('should assemble with a qualification and time', () => {

        let spyOnDeserializeQualification = spyOn(Qualificacao.prototype, 'deserialize').and.callThrough();
        let spyOnDeserializeTempo = spyOn(Tempo.prototype, 'deserialize').and.callThrough();

        let rawInput = { qualificacao: { id: '123' }, tempo: '1y2m' };

        let experiencia = new Experiencia().deserialize(rawInput);

        expect(spyOnDeserializeQualification).toHaveBeenCalledTimes(1);
        expect(spyOnDeserializeTempo).toHaveBeenCalledTimes(1);

        expect(experiencia.qualificacao.id).toBe('123');
        expect(experiencia.tempo.anos).toBe(1);
        expect(experiencia.tempo.meses).toBe(2);
    });

    it('should assemble without a qualification and time', () => {

        let spyOnDeserializeQualification = spyOn(Qualificacao.prototype, 'deserialize').and.callThrough();
        let spyOnDeserializeTempo = spyOn(Tempo.prototype, 'deserialize').and.callThrough();

        let rawInput = {};

        let experiencia = new Experiencia().deserialize(rawInput);

        expect(spyOnDeserializeQualification).toHaveBeenCalledTimes(0);
        expect(spyOnDeserializeTempo).toHaveBeenCalledTimes(0);

    });



});