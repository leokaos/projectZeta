package org.leo.projectzeta.model.builder;

import org.leo.projectzeta.model.Qualificacao;

public class QualificacaoBuilder {

	public static Qualificacao qualificacao(String descricao, String versao, String id) {

		Qualificacao quali = new Qualificacao();

		quali.setDescricao(descricao);
		quali.setVersao(versao);
		quali.setId(id);

		return quali;
	}

}
