package org.leo.projectzeta.model;

import static org.leo.projectzeta.model.StatusVaga.CANCELADA;
import static org.leo.projectzeta.model.StatusVaga.ENTREVISTANDO;
import static org.leo.projectzeta.model.StatusVaga.FINALIZADA;
import static org.leo.projectzeta.model.StatusVaga.INICIADA;
import static org.leo.projectzeta.model.StatusVaga.SELECIONANDO_CANDIDATOS;
import static org.leo.projectzeta.util.Mensagens.MUDANCA_NAO_PERMITIDA;
import static org.leo.projectzeta.util.Mensagens.VAGA_SEM_CANDIDATOS_SELECIONADOS;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.leo.projectzeta.api.Entidade;
import org.leo.projectzeta.exception.BusinessException;

import com.google.common.collect.Sets;

@Entity
@Table(name = "vaga", schema = "rh")
public class Vaga implements Entidade<Long> {

	private static final long serialVersionUID = 6766591657037334221L;

	@Id
	@GeneratedValue(generator = "vaga_seq")
	@SequenceGenerator(name = "vaga_seq", sequenceName = "vaga_seq", allocationSize = 1, schema = "rh")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "empresa_id")
	private Empresa empresa;

	@NotNull
	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private StatusVaga status = StatusVaga.NOVA;

	@NotEmpty
	@Column(name = "titulo")
	private String titulo;

	@NotEmpty
	@Column(name = "descricao")
	private String descricao;

	@Valid
	@NotNull
	@Embedded
	private Periodo periodo;

	@NotNull
	@Column(name = "data_entrada")
	private Date dataEntrada = new Date();

	@NotEmpty
	@Column(name = "contato_telefone")
	private String contatoTelefone;

	@NotEmpty
	@Column(name = "contato_email")
	private String contatoEmail;

	@ManyToMany
	@JoinTable(name = "exigencias", schema = "rh", joinColumns = @JoinColumn(name = "vaga_id"), inverseJoinColumns = @JoinColumn(name = "qualificacao_id"))
	private Set<Qualificacao> exigencias = Sets.newHashSet();

	@OneToMany(mappedBy = "vaga")
	private Set<Candidato> candidatos = Sets.newHashSet();

	@NotEmpty
	@ElementCollection
	@Column(name = "tag")
	@CollectionTable(name = "tags", schema = "rh", joinColumns = { @JoinColumn(columnDefinition = "vaga_id") })
	private Set<String> tags = Sets.newHashSet();

	@Override
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

	public StatusVaga getStatus() {
		return status;
	}

	public void setStatus(StatusVaga status) {
		this.status = status;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Periodo getPeriodo() {
		return periodo;
	}

	public void setPeriodo(Periodo periodo) {
		this.periodo = periodo;
	}

	public Date getDataEntrada() {
		return dataEntrada;
	}

	public void setDataEntrada(Date dataEntrada) {
		this.dataEntrada = dataEntrada;
	}

	public String getContatoTelefone() {
		return contatoTelefone;
	}

	public void setContatoTelefone(String contatoTelefone) {
		this.contatoTelefone = contatoTelefone;
	}

	public String getContatoEmail() {
		return contatoEmail;
	}

	public void setContatoEmail(String contatoEmail) {
		this.contatoEmail = contatoEmail;
	}

	public Set<Qualificacao> getExigencias() {
		return exigencias;
	}

	public void setExigencias(Set<Qualificacao> exigencias) {
		this.exigencias = exigencias;
	}

	public Set<Candidato> getCandidatos() {
		return candidatos;
	}

	public void setCandidatos(Set<Candidato> candidatos) {
		this.candidatos = candidatos;
	}

	public Set<String> getTags() {
		return tags;
	}

	public void setTags(Set<String> tags) {
		this.tags = tags;
	}

	public void selecionarCandidatos(List<Profissional> todosOsProfissionais) {

		if (candidatos == null) {
			this.candidatos = Sets.newHashSet();
		}

		for (Profissional profissional : todosOsProfissionais) {

			if (profissional.estaAptoComecarData(this.periodo.getDataInicial())) {

				int pontuacao = 0;

				for (Qualificacao qualificacao : exigencias) {
					pontuacao += profissional.getPontuacaoParaQualificacao(qualificacao);
				}

				pontuacao = pontuacao / exigencias.size();

				if (pontuacao != 0) {
					candidatos.add(Candidato.createFrom(this, profissional, pontuacao));
				}
			}

		}

		if (this.candidatos.isEmpty()) {
			this.status = SELECIONANDO_CANDIDATOS;
		} else {
			this.status = ENTREVISTANDO;
		}

	}

	public boolean comStatus(StatusVaga status) {
		return this.status.equals(status);
	}

	public void mudarStatusPara(StatusVaga status) {
		this.status = status;
	}

	public void iniarEntrevistas() throws BusinessException {

		if (!comStatus(SELECIONANDO_CANDIDATOS)) {
			throw new BusinessException(MUDANCA_NAO_PERMITIDA, "vaga", "status");
		}

		if (!hasCandidatos()) {
			throw new BusinessException(VAGA_SEM_CANDIDATOS_SELECIONADOS, "vaga", "candidatos");
		}

		mudarStatusPara(ENTREVISTANDO);
	}

	public void iniciar() throws BusinessException {

		if (!comStatus(ENTREVISTANDO)) {
			throw new BusinessException(MUDANCA_NAO_PERMITIDA, "vaga", "status");
		}

		if (periodo.getDataInicial().after(new Date())) {
			mudarStatusPara(StatusVaga.AGUARDANDO_INICIO);
		} else {
			mudarStatusPara(StatusVaga.INICIADA);
		}
	}

	public void finalizarVaga() throws BusinessException {

		if (!comStatus(INICIADA)) {
			throw new BusinessException(MUDANCA_NAO_PERMITIDA, "vaga", "status");
		}

		mudarStatusPara(FINALIZADA);
	}

	public void cancelarVaga() throws BusinessException {
		mudarStatusPara(CANCELADA);
	}

	private boolean hasCandidatos() {
		return this.candidatos != null && !this.candidatos.isEmpty();
	}
}
