package org.leo.projectzeta.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import org.leo.projectzeta.api.Entidade;

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

	@OneToMany(mappedBy = "categoria")
	private List<Qualificacao> qualificacoes;

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

	public List<Qualificacao> getQualificacoes() {
		return qualificacoes;
	}

	public void setQualificacoes(List<Qualificacao> qualificacoes) {
		this.qualificacoes = qualificacoes;
	}

}
