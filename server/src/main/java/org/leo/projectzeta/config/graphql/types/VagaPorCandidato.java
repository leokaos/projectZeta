package org.leo.projectzeta.config.graphql.types;

public class VagaPorCandidato {

	private String id;
	private Integer quantidade;

	public VagaPorCandidato() {
		super();
	}

	public VagaPorCandidato(String id, Integer quantidade) {
		super();
		this.id = id;
		this.quantidade = quantidade;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}

}
