import { Tempo } from "./Tempo";

describe('Tempo', () => {

  beforeEach(() => { });

  it('deveria retornar com anos e meses', () => {

    let tempo: Tempo = new Tempo().deserialize('1y2m');

    expect(tempo.anos).toBe(1);
    expect(tempo.meses).toBe(2);
    
  });

  it('deveria retornar apenas com anos', () => {

    let tempo: Tempo = new Tempo().deserialize('1y');

    expect(tempo.anos).toBe(1);
    expect(tempo.meses).toBe(0);
    
  });

  it('deveria retornar apenas com meses', () => {

    let tempo: Tempo = new Tempo().deserialize('2m');

    expect(tempo.anos).toBe(0);
    expect(tempo.meses).toBe(2);
    
  });


});
