package org.leo.projectzeta.model;

import java.util.Date;
import java.util.Optional;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.leo.projectzeta.api.Entidade;
import org.leo.projectzeta.factory.ExperienciaFactory;

import com.google.common.collect.Sets;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "profissional", schema = "rh")
@Setter
@Getter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Profissional implements Entidade<Long> {

	private static final long serialVersionUID = 4167462411308649614L;

	@Id
	@GeneratedValue(generator = "profissional_seq")
	@SequenceGenerator(name = "profissional_seq", sequenceName = "profissional_seq", allocationSize = 1, schema = "rh")
	@EqualsAndHashCode.Include
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
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "data_contato")
	private Date dataContato;

	@Column(name = "data_comeco")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataComeco;

	@Lob
	@Column(name = "avatar")
	private String avatar;

	@NotNull
	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private StatusProfissional status = StatusProfissional.EM_CONTATO;

	@OneToMany(mappedBy = "profissional", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	private Set<Experiencia> experiencias = Sets.newHashSet();

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
