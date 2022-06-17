package org.leo.projectzeta.config.graphql.types;

public class VagaPorCandidato {

	private Long id;
	private Integer quantidade;

	public VagaPorCandidato() {
		super();
	}

	public VagaPorCandidato(Long id, Integer quantidade) {
		super();
		this.id = id;
		this.quantidade = quantidade;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

}
