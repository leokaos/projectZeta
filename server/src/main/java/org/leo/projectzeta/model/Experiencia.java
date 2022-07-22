package org.leo.projectzeta.model;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import org.leo.projectzeta.api.Entidade;
import org.leo.projectzeta.config.db.TempoConverter;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@EqualsAndHashCode(of = "id")
@Table(name = "experiencia", schema = "rh")
public class Experiencia implements Entidade<ExperienciaPK> {

    private static final long serialVersionUID = -1381767258274041223L;

    @EmbeddedId
    @JsonIgnore
    private ExperienciaPK id;

    @ManyToOne
    @JoinColumn(name = "qualificacao_id", insertable = false, updatable = false)
    private Qualificacao qualificacao;

    @ManyToOne
    @JoinColumn(name = "profissional_id", insertable = false, updatable = false)
    @JsonIgnore
    private Profissional profissional;

    @Column(name = "tempo")
    @Convert(converter = TempoConverter.class)
    private Tempo tempo;

}
