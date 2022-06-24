package org.leo.projectzeta.controller;

import org.leo.projectzeta.config.web.DTOAttribute;

public class Filtro {

    @DTOAttribute("categoria.id")
    private Long categoriaId;

    public Long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }


}
