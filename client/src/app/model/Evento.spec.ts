import { Equivalencia } from './Equivalencia';
import { Evento } from './Evento';
import { Qualificacao } from './Qualificacao';

describe('Evento', () => {

    it('should assemble with date', () => {

        let rawInput = { 'data-evento': 946681200000 }; //Sat Jan 01 2000 00:00:00 GMT+0100 (Central European Standard Time)

        let evento = new Evento().deserialize(rawInput);

        expect(evento.dataEvento).not.toBeNull();
        expect(evento.dataEvento.getFullYear()).toBe(2000);
        expect(evento.dataEvento.getMonth()).toBe(0);
        expect(evento.dataEvento.getDate()).toBe(1);
    });

    it('should assemble without date', () => {

        let evento = new Evento().deserialize({});

        expect(evento.dataEvento).toBeUndefined();
    });

});