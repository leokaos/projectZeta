package org.leo.projectzeta.model;

import lombok.*;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class ExperienciaPK implements Serializable {

    private static final long serialVersionUID = 1577375438678405665L;

    @ManyToOne
    @JoinColumn(name = "qualificacao_id")
    private Qualificacao qualificacao;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

}
