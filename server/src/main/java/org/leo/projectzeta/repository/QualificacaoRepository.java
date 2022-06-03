package org.leo.projectzeta.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualificacaoRepository extends MongoRepository<Qualificacao, String> {

	Qualificacao findByDescricaoAndVersao(String descricao, String versao);

}
