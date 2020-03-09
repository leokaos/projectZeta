package org.leo.projectzeta.repository;

import java.util.List;

import org.leo.projectzeta.model.TipoQualificacao;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoQualificacaoRepository extends MongoRepository<TipoQualificacao, String> {

	List<TipoQualificacao> findByDescricao(String descricao);

}
