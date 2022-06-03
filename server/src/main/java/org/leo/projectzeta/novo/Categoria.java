package org.leo.projectzeta.novo;

import org.leo.projectzeta.api.Entidade;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "categoria", schema = "rh")
public class Categoria implements Entidade<Long> {

    private static final long serialVersionUID = 4835527334281299043L;

    @Id
    @GeneratedValue(generator = "categoria_seq")
    @SequenceGenerator(name = "categoria_seq", sequenceName = "categoria_seq", allocationSize = 1, schema = "rh")
    private Long id;

    @NotEmpty
    @Column(name = "descricao")
    private String descricao;

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
