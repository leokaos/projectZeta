package org.leo.projectzeta.repository;

import org.leo.projectzeta.model.Vaga;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VagaRepository extends MongoRepository<Vaga, String> {

}
