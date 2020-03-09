package org.leo.projectzeta.model;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.leo.projectzeta.api.Entidade;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.google.common.collect.Sets;

@Document(collection = "qualificacao")
public class Qualificacao implements Entidade {

	private static final long serialVersionUID = -8953603121364594301L;

	@Id
	private String id;

	@NotEmpty
	private String descricao;

	@NotEmpty
	private String versao;

	@Valid
	@NotNull
	@DBRef
	private TipoQualificacao tipo;

	@Valid
	private Set<Equivalencia> equivalencias = Sets.newHashSet();

	public Qualificacao() {
		super();
	}

	@Override
	public String getId() {
		return id;
	}

	public void setId(String id) {
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

	public TipoQualificacao getTipo() {
		return tipo;
	}

	public void setTipo(TipoQualificacao tipo) {
		this.tipo = tipo;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {

		if (this == obj) {
			return true;
		}

		if (obj == null) {
			return false;
		}

		if (getClass() != obj.getClass()) {
			return false;
		}

		Qualificacao other = (Qualificacao) obj;

		return new EqualsBuilder().append(this.id, other.id).isEquals();
	}

}
