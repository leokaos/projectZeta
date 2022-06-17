package org.leo.projectzeta.repository;

import java.util.List;

import org.leo.projectzeta.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

	List<Categoria> findByDescricao(String descricao);

}
