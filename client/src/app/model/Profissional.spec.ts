import { Experiencia } from './Experiencia';
import { Profissional } from './Profissional';

describe('Profissional', () => {

  it('should assemble a Profissional', () => {

    let spyOnExperienciaDeserialize = spyOn(Experiencia.prototype, 'deserialize').and.callThrough();

    let rawProfissional = {
      id: 3,
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

    let profissional = new Profissional().deserialize(rawProfissional);

    expect(profissional.nome).toBe('nome');
    expect(profissional.sobrenome).toBe('sobrenome');
    expect(profissional.id).toBe(3);
    expect(profissional.email).toBe('email');
    expect(profissional.titulo).toBe('titulo');
    expect(profissional.avatar).toBe('avatar');
    expect(profissional.experiencias.length).toBe(2);

    expect(profissional.dataContato).toEqual(new Date(123));
    expect(profissional.dataComeco).toEqual(new Date(456));

    expect(profissional.profileRating).toBe(1);

    expect(spyOnExperienciaDeserialize).toHaveBeenCalledTimes(2);

  });

  it('should assemble a rawProfissional without experience', () => {

    let profissional = new Profissional().deserialize({});

    expect(profissional.experiencias.length).toBe(0);
  });

  it('should return apropriate contemNomes', () => {

    let profissional = new Profissional().deserialize({ nome: 'nome', sobrenome: 'sobrenome' });

    expect(profissional.contemNomes(['nome'])).toBeTrue();
    expect(profissional.contemNomes(['sobre'])).toBeTrue();
    expect(profissional.contemNomes(['test'])).toBeFalse();
  });

});
