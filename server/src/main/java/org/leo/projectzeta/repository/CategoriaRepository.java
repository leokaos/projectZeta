package org.leo.projectzeta.repository;

import org.leo.projectzeta.novo.Categoria;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends CrudRepository<Categoria, Long> {

    List<Categoria> findByDescricao(String descricao);

}
