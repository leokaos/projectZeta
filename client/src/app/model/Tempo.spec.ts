import { Tempo } from "./Tempo";

describe('Tempo', () => {

    it('should deserialize correctly', () => {

        let tempo = new Tempo().deserialize("1y2m");

        expect(tempo.meses).toBe(2);
        expect(tempo.anos).toEqual(1);
    });

    it('should deserialize incorrectly', () => {

        let tempo = new Tempo().deserialize("1a2e");

        expect(tempo.meses).toBe(0);
        expect(tempo.anos).toEqual(0);
    });


});