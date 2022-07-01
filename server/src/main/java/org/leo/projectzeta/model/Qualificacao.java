package org.leo.projectzeta.model;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.leo.projectzeta.api.Entidade;

import com.google.common.collect.Sets;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "qualificacao", schema = "rh")
public class Qualificacao implements Entidade<Long> {

    private static final long serialVersionUID = -8953603121364594301L;

    @Id
    @GeneratedValue(generator = "profissional_seq")
    @SequenceGenerator(name = "profissional_seq", sequenceName = "profissional_seq", allocationSize = 1, schema = "rh")
    @EqualsAndHashCode.Include
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
