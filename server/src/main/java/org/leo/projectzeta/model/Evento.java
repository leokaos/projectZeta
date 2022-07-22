package org.leo.projectzeta.model;

import java.io.Serializable;
import java.util.Date;

import org.codehaus.jackson.annotate.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "eventos")
@Getter
@Setter
@NoArgsConstructor
public class Evento implements Serializable {

	private static final long serialVersionUID = -1796369471555373481L;

	@Id
	private String id;

	@JsonProperty("data-evento")
	private Date dataEvento;

	private String entidade;

	@JsonProperty("tipo-entidade")
	private String tipoEntidade;

	@JsonProperty("id-entidade")
	private String idEntidade;

	private String operacao;

}
