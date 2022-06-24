package org.leo.projectzeta.model;

import com.google.common.collect.Sets;
import org.leo.projectzeta.api.Entidade;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "qualificacao", schema = "rh")
public class Qualificacao implements Entidade<Long> {

    private static final long serialVersionUID = -8953603121364594301L;

    @Id
    @GeneratedValue(generator = "profissional_seq")
    @SequenceGenerator(name = "profissional_seq", sequenceName = "profissional_seq", allocationSize = 1, schema = "rh")
    private Long id;

    @NotEmpty
    @Column(name = "descricao")
    private String descricao;

    @NotEmpty
    @Column(name = "versao")
    private String versao;

    @Valid
    @NotNull
    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @Valid
    @OneToMany(mappedBy = "origem", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Equivalencia> equivalencias = Sets.newHashSet();

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

    public String getVersao() {
        return versao;
    }

    public void setVersao(String versao) {
        this.versao = versao;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Set<Equivalencia> getEquivalencias() {
        return equivalencias;
    }

    public void setEquivalencias(Set<Equivalencia> equivalencias) {
        this.equivalencias = equivalencias;
    }

    public void addEquivalencia(Qualificacao qualificacao, int valor) {

        Equivalencia eq = new Equivalencia();

        eq.setDestino(qualificacao);
        eq.setValor(valor);

        this.equivalencias.add(eq);
    }

    public Integer getEquivalencia(Qualificacao qualificacao) {

        if (this.equals(qualificacao)) {
            return 100;
        }

        List<Equivalencia> exists = this.equivalencias.stream().filter(eq -> eq.getDestino().equals(qualificacao)).collect(Collectors.toList());

        if (exists.isEmpty()) {
            return 0;
        } else {
            return exists.iterator().next().getValor();
        }

    }

}
