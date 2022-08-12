package org.leo.projectzeta.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@EqualsAndHashCode
@Getter
@Setter
public class CandidatoPK implements Serializable {

	private static final long serialVersionUID = -2041826426408185887L;

	@Column(name = "profissional_id")
	private Long profissional;

	@Column(name = "vaga_id")
	private Long vaga;

}
