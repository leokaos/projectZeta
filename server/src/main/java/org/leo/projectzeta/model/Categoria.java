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

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "categoria", schema = "rh")
public class Categoria implements Entidade<Long> {

	private static final long serialVersionUID = 4835527334281299043L;

	@Id
	@GeneratedValue(generator = "categoria_seq")
	@SequenceGenerator(name = "categoria_seq", sequenceName = "categoria_seq", allocationSize = 1, schema = "rh")
	@EqualsAndHashCode.Include
	private Long id;

	@NotEmpty
	@Column(name = "descricao")
	private String descricao;

	@JsonIgnore
	@OneToMany(mappedBy = "categoria")
	private List<Qualificacao> qualificacoes;

}
