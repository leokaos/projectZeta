package org.leo.projectzeta.repository;

import org.leo.projectzeta.novo.Profissional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfissionalRepository extends CrudRepository<Profissional, Long> {

}
