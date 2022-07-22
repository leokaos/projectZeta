package org.leo.projectzeta.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import org.leo.projectzeta.api.Entidade;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "empresa", schema = "rh")
public class Empresa implements Entidade<Long> {

	private static final long serialVersionUID = -8752373333537990978L;

	@Id
	@GeneratedValue(generator = "empresa_seq")
	@SequenceGenerator(name = "empresa_seq", sequenceName = "empresa_seq", allocationSize = 1, schema = "rh")
	@EqualsAndHashCode.Include
	private Long id;

	@Column(name = "nome")
	@NotEmpty
	private String nome;

}
