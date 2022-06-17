package org.leo.projectzeta.repository;

import org.leo.projectzeta.model.Qualificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualificacaoRepository extends JpaRepository<Qualificacao, Long> {

	Qualificacao findByDescricaoAndVersao(String descricao, String versao);

}
