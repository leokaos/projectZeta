package org.leo.projectzeta.novo;

import com.google.common.collect.Sets;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

@Ent
public class Profissional {

    @Id
    private Long id;

    @NotEmpty
    private String nome;

    @NotEmpty
    private String sobrenome;

    @NotEmpty
    private String titulo;

    @NotEmpty
    private String email;

    @NotNull
    private Date dataContato;

    private Date dataComeco;

    private String avatar;

    @NotNull
    private StatusCandidato status = StatusCandidato.EM_CONTATO;

    private Set<Experiencia> experiencias = Sets.newHashSet();
}
