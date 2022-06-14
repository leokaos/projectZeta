package org.leo.projectzeta.repository;

import org.leo.projectzeta.novo.Vaga;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VagaRepository extends CrudRepository<Vaga, Long> {

}
