package org.leo.projectzeta.repository;

import java.util.List;

import org.leo.projectzeta.model.Categoria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends MongoRepository<Categoria, String> {

	List<Categoria> findByDescricao(String descricao);

}
