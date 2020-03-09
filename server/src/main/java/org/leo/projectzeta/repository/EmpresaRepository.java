package org.leo.projectzeta.repository;

import org.leo.projectzeta.model.Empresa;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends MongoRepository<Empresa, String> {

}
