package org.leo.projectzeta.model;

import java.util.Date;
import java.util.Optional;
import java.util.Set;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.leo.projectzeta.api.Entidade;
import org.leo.projectzeta.factory.ExperienciaFactory;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.google.common.collect.Sets;

@Document(collection = "candidato")
public class Candidato implements Entidade {

	private static final long serialVersionUID = 7401417159169226473L;

	@Id
	private String id;

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

	@NotNull
	private StatusCandidato status = StatusCandidato.EM_CONTATO;

	private Set<Experiencia> experiencias = Sets.newHashSet();

	public Candidato() {
		super();
	}

	@Override
	public String getId() {
		return id;
	}

	public void setId(String id) {
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

	public StatusCandidato getStatus() {
		return status;
	}

	public void setStatus(StatusCandidato status) {
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

	public boolean estaAptoComecarData(Date data){
		return dataComeco != null && dataComeco.before(data);
	}

}
