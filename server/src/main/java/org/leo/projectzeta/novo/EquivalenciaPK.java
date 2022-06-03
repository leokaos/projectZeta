package org.leo.projectzeta.novo;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class EquivalenciaPK {

    @ManyToOne
    @JoinColumn(name = "destino_id")
    private Qualificacao destino;

    @ManyToOne
    @JoinColumn(name = "origem_id")
    private Qualificacao origem;

    public Qualificacao getDestino() {
        return destino;
    }

    public void setDestino(Qualificacao destino) {
        this.destino = destino;
    }

    public Qualificacao getOrigem() {
        return origem;
    }

    public void setOrigem(Qualificacao origem) {
        this.origem = origem;
    }
}
