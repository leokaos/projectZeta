package org.leo.projectzeta.factory;

import org.leo.projectzeta.novo.Experiencia;
import org.leo.projectzeta.novo.Qualificacao;
import org.leo.projectzeta.novo.Tempo;

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
