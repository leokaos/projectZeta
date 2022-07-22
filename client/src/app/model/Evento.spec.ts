import { Equivalencia } from './Equivalencia';
import { Evento } from './Evento';
import { Qualificacao } from './Qualificacao';

describe('Evento', () => {

    it('should assemble with date', () => {

        let rawInput = { 'data-evento': 946681200000 };

        let evento = new Evento().deserialize(rawInput);

        expect(evento.dataEvento).not.toBeNull();
        expect(evento.dataEvento.getFullYear()).toBe(1999);
        expect(evento.dataEvento.getMonth()).toBe(11);
        expect(evento.dataEvento.getDate()).toBe(31);
    });

    it('should assemble without date', () => {

        let evento = new Evento().deserialize({});

        expect(evento.dataEvento).toBeUndefined();
    });

});