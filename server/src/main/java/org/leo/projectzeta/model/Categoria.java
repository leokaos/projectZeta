package org.leo.projectzeta.model;

import javax.validation.constraints.NotEmpty;

import org.leo.projectzeta.api.Entidade;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.util.StringUtils;

@Document(collection = "categoria")
public class Categoria implements Entidade {

	private static final long serialVersionUID = 4835527334281299043L;

	@Id
	private String id;

	@NotEmpty
	private String descricao;

	public Categoria() {
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

	public boolean hasId() {
		return !StringUtils.isEmpty(id);
	}

}
