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

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.leo.projectzeta.api.Entidade;
import org.leo.projectzeta.exception.BusinessException;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.google.common.collect.Sets;

@Document(collection = "vagas")
public class Vaga implements Entidade {

	private static final long serialVersionUID = 6766591657037334221L;

	@Id
	private String id;

	@DBRef
	@NotNull
	private Empresa empresa;

	@NotNull
	private StatusVaga status = StatusVaga.NOVA;

	@NotEmpty
	private String titulo;

	@NotEmpty
	private String descricao;

	@NotNull
	@Valid
	private Periodo periodo;

	@NotNull
	private Date dataEntrada = new Date();

	@NotEmpty
	private String contatoTelefone;

	@NotEmpty
	private String contatoEmail;

	@DBRef
	private Set<Qualificacao> exigencias = Sets.newHashSet();

	private Set<CandidatoSelecionado> candidatosSelecionados = Sets.newHashSet();

	@NotEmpty
	private Set<String> tags = Sets.newHashSet();

	public Vaga() {
		super();
	}

	@Override
	public String getId() {
		return id;
	}

	public void setId(String id) {
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

	public String getDescricao() {
		return descricao;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
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

	public Set<CandidatoSelecionado> getCandidatosSelecionados() {
		return candidatosSelecionados;
	}

	public void setCandidatosSelecionados(Set<CandidatoSelecionado> candidatosSelecionados) {
		this.candidatosSelecionados = candidatosSelecionados;
	}

	public Set<String> getTags() {
		return tags;
	}

	public void setTags(Set<String> tags) {
		this.tags = tags;
	}

	public void selecionarCandidatos(List<Candidato> todosOsCandidatos) {

		if (candidatosSelecionados == null) {
			this.candidatosSelecionados = Sets.newHashSet();
		}

		for (Candidato candidato : todosOsCandidatos) {

			if (candidato.estaAptoComecarData(this.periodo.getDataInicial())) {

				int pontuacao = 0;

				for (Qualificacao qualificacao : exigencias) {
					pontuacao += candidato.getPontuacaoParaQualificacao(qualificacao);
				}
				
				pontuacao = pontuacao / exigencias.size();

				if (pontuacao != 0) {
					candidatosSelecionados.add(new CandidatoSelecionado(pontuacao, candidato));
				}
			}

		}

		if (this.candidatosSelecionados.isEmpty()) {
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
		return this.candidatosSelecionados != null && !this.candidatosSelecionados.isEmpty();
	}
}
