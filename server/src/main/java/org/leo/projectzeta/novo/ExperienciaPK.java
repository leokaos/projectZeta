package org.leo.projectzeta.novo;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class ExperienciaPK {

    @ManyToOne
    @JoinColumn(name = "qualificacao_id")
    private Qualificacao qualificacao;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

    public Qualificacao getQualificacao() {
        return qualificacao;
    }

    public void setQualificacao(Qualificacao qualificacao) {
        this.qualificacao = qualificacao;
    }

    public Profissional getProfissional() {
        return profissional;
    }

    public void setProfissional(Profissional profissional) {
        this.profissional = profissional;
    }
}
