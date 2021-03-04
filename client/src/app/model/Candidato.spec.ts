import { Candidato } from './Candidato';
import { Experiencia } from './Experiencia';

describe('Candidato', () => {

  it('should assemble a candidate', () => {

    let spyOnExperienciaDeserialize = spyOn(Experiencia.prototype, 'deserialize').and.callThrough();

    let rawCandidato = {
      id: 'id',
      nome: 'nome',
      sobrenome: 'sobrenome',
      titulo: 'titulo',
      email: 'email',
      avatar: 'avatar',
      dataContato: 123,
      dataComeco: 456,
      experiencias: [
        { id: '123' },
        { id: '456' }
      ]
    };

    let candidato = new Candidato().deserialize(rawCandidato);

    expect(candidato.nome).toBe('nome');
    expect(candidato.sobrenome).toBe('sobrenome');
    expect(candidato.id).toBe('id');
    expect(candidato.email).toBe('email');
    expect(candidato.titulo).toBe('titulo');
    expect(candidato.avatar).toBe('avatar');
    expect(candidato.experiencias.length).toBe(2);

    expect(candidato.dataContato).toEqual(new Date(123));
    expect(candidato.dataComeco).toEqual(new Date(456));

    expect(candidato.profileRating).toBe(1);

    expect(spyOnExperienciaDeserialize).toHaveBeenCalledTimes(2);

  });

  it('should assemble a candidate without experience', () => {

    let candidato = new Candidato().deserialize({});

    expect(candidato.experiencias.length).toBe(0);
  });

  it('should return apropriate contemNomes', () => {

    let candidado = new Candidato().deserialize({ nome: 'nome', sobrenome: 'sobrenome' });

    expect(candidado.contemNomes(['nome'])).toBeTrue();
    expect(candidado.contemNomes(['sobre'])).toBeTrue();
    expect(candidado.contemNomes(['test'])).toBeFalse();
  });

});
