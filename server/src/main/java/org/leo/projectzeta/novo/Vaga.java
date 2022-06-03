package org.leo.projectzeta.novo;

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

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.leo.projectzeta.api.Entidade;
import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.model.Candidato;
import org.leo.projectzeta.model.Periodo;
import org.leo.projectzeta.model.StatusVaga;
import org.leo.projectzeta.novo.Empresa;
import org.leo.projectzeta.novo.Qualificacao;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private StatusVaga status = StatusVaga.NOVA;

    @NotEmpty
    @Column(name = "titulo")
    private String titulo;

    @NotEmpty
    @Column(name = "descricao")
    private String descricao;

    @NotNull
    @Valid
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

    private Set<Qualificacao> exigencias = Sets.newHashSet();

    private Set<Candidato> candidatosSelecionados = Sets.newHashSet();

    @NotEmpty
    private Set<String> tags = Sets.newHashSet();

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
                    candidatosSelecionados.add(new Candidato(pontuacao, candidato));
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
