package org.leo.projectzeta.novo;

import org.leo.projectzeta.api.Entidade;

public class Candidato implements Entidade<CandidatoPK> {

    private static final long serialVersionUID = -2041826426408185887L;

    private CandidatoPK id;

    private Candidato candidato;

    private Vaga vaga;

    private Integer pontuacao;

}
