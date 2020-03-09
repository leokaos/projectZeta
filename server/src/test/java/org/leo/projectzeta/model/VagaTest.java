package org.leo.projectzeta.model;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.leo.projectzeta.model.StatusVaga.AGUARDANDO_INICIO;
import static org.leo.projectzeta.model.StatusVaga.CANCELADA;
import static org.leo.projectzeta.model.StatusVaga.ENTREVISTANDO;
import static org.leo.projectzeta.model.StatusVaga.FINALIZADA;
import static org.leo.projectzeta.model.StatusVaga.INICIADA;
import static org.leo.projectzeta.model.StatusVaga.NOVA;
import static org.leo.projectzeta.model.StatusVaga.SELECIONANDO_CANDIDATOS;
import static org.leo.projectzeta.util.Mensagens.MUDANCA_NAO_PERMITIDA;
import static org.leo.projectzeta.util.Mensagens.VAGA_SEM_CANDIDATOS_SELECIONADOS;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.time.DateUtils;
import org.assertj.core.util.Lists;
import org.junit.Test;
import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.factory.PeriodoFactory;
import org.leo.projectzeta.factory.TempoFactory;

public class VagaTest {

	@Test
	public void deveriaSelecionarUmCandidatoComQualificacaoExataTest() throws Exception {

		Vaga vaga = new Vaga();
		vaga.setPeriodo(PeriodoFactory.from(new Date(), new Date()));

		Qualificacao q1 = new Qualificacao();

		vaga.getExigencias().add(q1);

		Tempo t1 = TempoFactory.parse("1y2m");
		Candidato c1 = new Candidato();
		c1.addExperiencia(q1, t1);
		c1.setDataComeco(DateUtils.addDays(new Date(), -1));

		Candidato c2 = new Candidato();
		c2.setDataComeco(DateUtils.addDays(new Date(), -1));

		List<Candidato> todosOsCandidatos = Lists.newArrayList(c1, c2);

		vaga.selecionarCandidatos(todosOsCandidatos);

		assertEquals(1, vaga.getCandidatosSelecionados().size());
		assertEquals(c1, vaga.getCandidatosSelecionados().get("100"));
		assertEquals(ENTREVISTANDO, vaga.getStatus());
	}

	@Test
	public void deveriaSelecionarUmCandidatoComQualificacaoComEquivalenciaTest() throws Exception {

		Vaga vaga = new Vaga();
		vaga.setPeriodo(PeriodoFactory.from(new Date(), new Date()));

		Qualificacao q1 = new Qualificacao();
		q1.setId("q1");
		Qualificacao q2 = new Qualificacao();
		q2.setId("q2");
		q2.addEquivalencia(q1, 50);

		vaga.getExigencias().add(q1);

		Tempo t1 = TempoFactory.parse("1y2m");
		Candidato c1 = new Candidato();
		c1.addExperiencia(q2, t1);
		c1.setDataComeco(DateUtils.addDays(new Date(), -1));

		Candidato c2 = new Candidato();
		c2.setDataComeco(DateUtils.addDays(new Date(), -1));

		List<Candidato> todosOsCandidatos = Lists.newArrayList(c1, c2);

		vaga.selecionarCandidatos(todosOsCandidatos);

		assertEquals(1, vaga.getCandidatosSelecionados().size());
		assertEquals(c1, vaga.getCandidatosSelecionados().get("50"));
		assertEquals(ENTREVISTANDO, vaga.getStatus());
	}

	@Test
	public void deveriaNaoSelecionarNenhumCandidatoTest() throws Exception {

		Vaga vaga = new Vaga();
		vaga.setCandidatosSelecionados(null);
		vaga.setPeriodo(PeriodoFactory.from(new Date(), new Date()));

		Qualificacao q1 = new Qualificacao();
		q1.setId("q1");
		Qualificacao q2 = new Qualificacao();
		q2.setId("q2");
		q2.addEquivalencia(q1, 50);

		vaga.getExigencias().add(q1);

		Candidato c1 = new Candidato();
		c1.setDataComeco(DateUtils.addHours(new Date(), -1));

		List<Candidato> todosOsCandidatos = Lists.newArrayList(c1);

		vaga.selecionarCandidatos(todosOsCandidatos);

		assertEquals(0, vaga.getCandidatosSelecionados().size());
		assertEquals(SELECIONANDO_CANDIDATOS, vaga.getStatus());
	}

	@Test
	public void deveriaRetornarErrorPoisMudancaNaoPermitidaTest() {

		Vaga vaga = new Vaga();
		vaga.setStatus(NOVA);

		try {
			vaga.iniciar();
			fail();
		} catch (BusinessException e) {
			assertEquals(MUDANCA_NAO_PERMITIDA, e.getMessage());
		}
	}

	@Test
	public void deveriaMudarPraAguardandoInicioTest() throws Exception {

		Date dataInicial = DateUtils.addDays(new Date(), 20);
		Date dataFinal = DateUtils.addDays(dataInicial, 120);

		Vaga vaga = new Vaga();
		vaga.setStatus(ENTREVISTANDO);
		vaga.setPeriodo(PeriodoFactory.from(dataInicial, dataFinal));

		vaga.iniciar();

		assertEquals(AGUARDANDO_INICIO, vaga.getStatus());
	}

	@Test
	public void deveriaMudarPraIniciadaTest() throws Exception {

		Date dataInicial = DateUtils.addDays(new Date(), -20);
		Date dataFinal = DateUtils.addDays(dataInicial, 120);

		Vaga vaga = new Vaga();
		vaga.setStatus(ENTREVISTANDO);
		vaga.setPeriodo(PeriodoFactory.from(dataInicial, dataFinal));

		vaga.iniciar();

		assertEquals(INICIADA, vaga.getStatus());
	}

	@Test
	public void deveriaRetornarErroPoisVagaNaoEstaIniciadaTest() throws Exception {

		Vaga vaga = new Vaga();
		vaga.setStatus(NOVA);

		try {
			vaga.finalizarVaga();
			fail();
		} catch (BusinessException e) {
			assertEquals(MUDANCA_NAO_PERMITIDA, e.getMessage());
		}
	}

	@Test
	public void deveriaMudarParaFinalizadaTest() throws Exception {

		Vaga vaga = new Vaga();
		vaga.setStatus(INICIADA);

		vaga.finalizarVaga();

		assertEquals(FINALIZADA, vaga.getStatus());
	}

	@Test
	public void deveriaCancelarVagaTest() throws Exception {

		Vaga vaga = new Vaga();
		vaga.setStatus(INICIADA);

		vaga.cancelarVaga();

		assertEquals(CANCELADA, vaga.getStatus());
	}

	@Test
	public void deveriaIniciarEntrevistasTest() throws Exception {

		Vaga vaga = new Vaga();
		vaga.setStatus(SELECIONANDO_CANDIDATOS);
		vaga.getCandidatosSelecionados().put("300", new Candidato());

		vaga.iniarEntrevistas();

		assertEquals(ENTREVISTANDO, vaga.getStatus());
	}

	@Test
	public void deveriaRetornarErroPoisNaoEstaNoStatusCorretoTest() throws Exception {

		Vaga vaga = new Vaga();
		vaga.setStatus(NOVA);

		try {
			vaga.iniarEntrevistas();
			fail();
		} catch (Exception e) {
			assertEquals(BusinessException.class, e.getClass());
			assertEquals(MUDANCA_NAO_PERMITIDA, e.getMessage());
		}

	}

	@Test
	public void deveriaRetornarErroPoisNaoTemNenhumCandidatoSelecionadoTest() throws Exception {

		Vaga vaga = new Vaga();
		vaga.setStatus(SELECIONANDO_CANDIDATOS);

		try {
			vaga.iniarEntrevistas();
			fail();
		} catch (Exception e) {
			assertEquals(BusinessException.class, e.getClass());
			assertEquals(VAGA_SEM_CANDIDATOS_SELECIONADOS, e.getMessage());
		}

	}

}
