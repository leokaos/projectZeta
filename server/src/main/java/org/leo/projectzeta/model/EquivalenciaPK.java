package org.leo.projectzeta.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EquivalenciaPK implements Serializable {

    private static final long serialVersionUID = 431458135783565558L;

    @Column(name = "destino_id")
    private Long destino;

    @Column(name = "origem_id")
    private Long origem;

}
