package org.leo.projectzeta.factory;

import org.leo.projectzeta.model.Experiencia;
import org.leo.projectzeta.model.Qualificacao;
import org.leo.projectzeta.model.Tempo;

public class ExperienciaFactory {

    private ExperienciaFactory() {
        super();
    }

    public static Experiencia criar(Qualificacao qualificacao, Tempo tempo) {

        Experiencia exp = new Experiencia();

        exp.setQualificacao(qualificacao);
        exp.setTempo(tempo);

        return exp;
    }

}
