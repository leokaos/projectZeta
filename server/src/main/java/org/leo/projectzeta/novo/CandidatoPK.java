package org.leo.projectzeta.novo;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class CandidatoPK implements Serializable {

    private static final long serialVersionUID = -2041826426408185887L;

    private CandidatoPK candidato;

    private Vaga vaga;


}
