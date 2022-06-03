package org.leo.projectzeta.novo;

import com.google.common.collect.Sets;
import org.leo.projectzeta.api.Entidade;
import org.leo.projectzeta.factory.ExperienciaFactory;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Optional;
import java.util.Set;

@Entity
@Table(name = "profissional", schema = "rh")
public class Profissional implements Entidade<Long> {

    @Id
    @GeneratedValue(generator = "profissional_seq")
    @SequenceGenerator(name = "profissional_seq", sequenceName = "profissional_seq", allocationSize = 1, schema = "rh")
    private Long id;

    @NotEmpty
    @Column(name = "nome")
    private String nome;

    @NotEmpty
    @Column(name = "sobrenome")
    private String sobrenome;

    @NotEmpty
    @Column(name = "titulo")
    private String titulo;

    @NotEmpty
    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "data_contato")
    private Date dataContato;

    @Column(name = "data_comeco")
    private Date dataComeco;

    @Column(name = "avatar")
    private String avatar;

    @NotNull
    private StatusProfissional status = StatusProfissional.EM_CONTATO;

    private Set<Experiencia> experiencias = Sets.newHashSet();

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDataContato() {
        return dataContato;
    }

    public void setDataContato(Date dataContato) {
        this.dataContato = dataContato;
    }

    public Date getDataComeco() {
        return dataComeco;
    }

    public void setDataComeco(Date dataComeco) {
        this.dataComeco = dataComeco;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public StatusProfissional getStatus() {
        return status;
    }

    public void setStatus(StatusProfissional status) {
        this.status = status;
    }

    public Set<Experiencia> getExperiencias() {
        return experiencias;
    }

    public void setExperiencias(Set<Experiencia> experiencias) {
        this.experiencias = experiencias;
    }

    public int getPontuacaoParaQualificacao(Qualificacao qualificacao) {

        Optional<Experiencia> exato = experiencias.stream().filter(exp -> exp.getQualificacao().equals(qualificacao)).findFirst();

        if (exato.isPresent()) {
            return 100;
        }

        Optional<Experiencia> maisAlto = experiencias.stream().filter(exp -> exp.getQualificacao().getEquivalencia(qualificacao) != 0).sorted((e1, e2) -> e2.getQualificacao().getEquivalencia(qualificacao) - e1.getQualificacao().getEquivalencia(qualificacao)).findFirst();

        if (maisAlto.isPresent()) {
            return maisAlto.get().getQualificacao().getEquivalencia(qualificacao);
        }

        return 0;
    }

    public void addExperiencia(Qualificacao qualificacao, Tempo tempo) {

        experiencias.removeIf(exp -> exp.getQualificacao().equals(qualificacao));

        experiencias.add(ExperienciaFactory.criar(qualificacao, tempo));
    }

    public boolean estaAptoComecarData(Date data) {
        return dataComeco != null && dataComeco.before(data);
    }
}
