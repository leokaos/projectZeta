package org.leo.projectzeta.model;

import java.util.Date;

import org.leo.projectzeta.api.Entidade;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "eventos")
public class Evento implements Entidade {

	private static final long serialVersionUID = -1796369471555373481L;

	@Id
	private String id;

	private Date dataEvento;

	private String entidade;

	private String tipoEntidade;

	private String idEntidade;

	private String operacao;

	public Evento() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getDataEvento() {
		return dataEvento;
	}

	public void setDataEvento(Date dataEvento) {
		this.dataEvento = dataEvento;
	}

	public String getEntidade() {
		return entidade;
	}

	public void setEntidade(String entidade) {
		this.entidade = entidade;
	}

	public String getTipoEntidade() {
		return tipoEntidade;
	}

	public void setTipoEntidade(String tipoEntidade) {
		this.tipoEntidade = tipoEntidade;
	}

	public String getIdEntidade() {
		return idEntidade;
	}

	public void setIdEntidade(String idEntidade) {
		this.idEntidade = idEntidade;
	}

	public String getOperacao() {
		return operacao;
	}

	public void setOperacao(String operacao) {
		this.operacao = operacao;
	}

}
