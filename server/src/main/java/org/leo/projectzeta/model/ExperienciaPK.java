package org.leo.projectzeta.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class ExperienciaPK implements Serializable {

	private static final long serialVersionUID = 1577375438678405665L;

	@Column(name = "qualificacao_id")
	private Long qualificacao;

	@Column(name = "profissional_id")
	private Long profissional;

}
