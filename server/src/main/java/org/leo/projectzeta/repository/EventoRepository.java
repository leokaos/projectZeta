package org.leo.projectzeta.repository;

import java.util.List;

import org.leo.projectzeta.model.Evento;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepository extends MongoRepository<Evento, String> {

	List<Evento> findByEntidadeAndTipoEntidade(String entidade, String tipoEntidade);
}
