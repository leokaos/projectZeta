package org.leo.projectzeta.model;

import org.leo.projectzeta.api.Entidade;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "empresa")
public class Empresa implements Entidade{

	private static final long serialVersionUID = -8752373333537990978L;

	@Id
	private String id;

	private String nome;

	public Empresa() {
		super();
	}

	@Override
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

}
