package org.leo.projectzeta.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class EquivalenciaPK implements Serializable {

    private static final long serialVersionUID = 431458135783565558L;

    @ManyToOne
    @JoinColumn(name = "destino_id")
    private Qualificacao destino;

    @ManyToOne
    @JoinColumn(name = "origem_id")
    private Qualificacao origem;

    public EquivalenciaPK(Qualificacao destino, Qualificacao origem) {
        this.destino = destino;
        this.origem = origem;
    }

    public EquivalenciaPK() {
        super();
    }

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
