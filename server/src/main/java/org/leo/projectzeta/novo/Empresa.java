package org.leo.projectzeta.novo;

import org.leo.projectzeta.api.Entidade;

import javax.persistence.*;

@Entity
@Table(name = "empresa", schema = "rh")
public class Empresa implements Entidade<Long> {

    private static final long serialVersionUID = -8752373333537990978L;

    @Id
    @GeneratedValue(generator = "empresa_seq")
    @SequenceGenerator(name = "empresa_seq", sequenceName = "empresa_seq", allocationSize = 1, schema = "rh")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
