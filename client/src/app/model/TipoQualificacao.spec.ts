import { Candidato } from './Candidato';
import { Qualificacao } from './Qualificacao';
import { TipoQualificacao } from './TipoQualificacao';
import { Equivalencia } from './Equivalencia';

describe('Candidate', () => {
  beforeEach(() => { });

  it('should return correct percentage', () => {
    const tipo: TipoQualificacao = new TipoQualificacao().deserialize(getTipoQualificacao());

    expect(tipo.porcentagemEquivalentes()).toBe(0);

    const qualificacao = new Qualificacao();
    qualificacao.equivalencias.push(new Equivalencia().deserialize({ "destino": "banco de dados", "valor": 70 }));

    tipo.qualificacoes.push(qualificacao);

    expect(tipo.porcentagemEquivalentes()).toBe(1);
  });

  it('should parse JSON to Object', () => {
    const tipo: TipoQualificacao = new TipoQualificacao().deserialize(getTipoQualificacao());

    expect(tipo.id).toBe("5d4960b64c353835e4453d19");
    expect(tipo.descricao).toBe('Banco de Dados');

  });

  function getTipoQualificacao() {
    return {
      "id": "5d4960b64c353835e4453d19",
      "descricao": "Banco de Dados"
    }
  }
});
