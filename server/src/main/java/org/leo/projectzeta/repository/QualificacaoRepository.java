package org.leo.projectzeta.repository;

import org.leo.projectzeta.novo.Qualificacao;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QualificacaoRepository extends CrudRepository<Qualificacao, Long> {

    Qualificacao findByDescricaoAndVersao(String descricao, String versao);

}
