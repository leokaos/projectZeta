package org.leo.projectzeta.facade;

import static org.easymock.EasyMock.expect;
import static org.easymock.EasyMock.replay;
import static org.easymock.EasyMock.verify;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.leo.projectzeta.util.Mensagens.EQUIVALENCIA_INVALIDA;
import static org.leo.projectzeta.util.Mensagens.QUALIFICACAO_JA_EXISTE;
import static org.leo.projectzeta.util.Mensagens.TIPO_QUALIFICACAO_INVALIDA;

import java.util.Optional;

import org.easymock.EasyMockRunner;
import org.easymock.Mock;
import org.easymock.MockType;
import org.easymock.TestSubject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.model.Qualificacao;
import org.leo.projectzeta.model.TipoQualificacao;
import org.leo.projectzeta.repository.QualificacaoRepository;
import org.leo.projectzeta.repository.TipoQualificacaoRepository;

import com.google.common.collect.Lists;

@RunWith(value = EasyMockRunner.class)
public class QualificacaoFacadeTest {

	@TestSubject
	private QualificacaoFacade facade = new QualificacaoFacade();

	@Mock(type = MockType.STRICT)
	private TipoQualificacaoRepository mockTipoQualificacaoRepository;

	@Mock(type = MockType.STRICT)
	private QualificacaoRepository mockQualificacaoRepository;

	@Test
	public void deveriaRetornarUmErrorPoisNaoExisteTipoQualificacaoTest() {

		TipoQualificacao tipo = new TipoQualificacao();
		tipo.setDescricao("TESTE");

		Qualificacao qualificacao = new Qualificacao();
		qualificacao.setDescricao("TESTE");
		qualificacao.setVersao("10");
		qualificacao.setTipo(tipo);

		expect(mockQualificacaoRepository.findByDescricaoAndVersao("TESTE", "10")).andReturn(null);
		expect(mockTipoQualificacaoRepository.findByDescricao("TESTE")).andReturn(Lists.newArrayList());

		replayAll();

		try {
			facade.novo(qualificacao);
			fail();
		} catch (BusinessException e) {
			assertEquals(BusinessException.class, e.getClass());
			assertEquals(TIPO_QUALIFICACAO_INVALIDA, e.getMessage());
		}

		verifyAll();
	}

	@Test
	public void deveriaRetornarUmErrorPoisExisteMaisDeUmTipoQualificacaoTest() {

		TipoQualificacao tipo = new TipoQualificacao();
		tipo.setDescricao("TESTE");

		Qualificacao qualificacao = new Qualificacao();
		qualificacao.setDescricao("TESTE");
		qualificacao.setVersao("10");
		qualificacao.setTipo(tipo);

		expect(mockQualificacaoRepository.findByDescricaoAndVersao("TESTE", "10")).andReturn(null);
		expect(mockTipoQualificacaoRepository.findByDescricao("TESTE")).andReturn(Lists.newArrayList(tipo, tipo));

		replayAll();

		try {
			facade.novo(qualificacao);
			fail();
		} catch (BusinessException e) {
			assertEquals(BusinessException.class, e.getClass());
			assertEquals(TIPO_QUALIFICACAO_INVALIDA, e.getMessage());
		}

		verifyAll();
	}

	@Test
	public void deveriaRetornarSucessoTest() {

		TipoQualificacao tipo = new TipoQualificacao();
		tipo.setDescricao("TESTE");

		TipoQualificacao tipoComId = new TipoQualificacao();
		tipoComId.setDescricao("TESTE");
		tipoComId.setId("123");

		Qualificacao qualificacao = new Qualificacao();
		qualificacao.setDescricao("TESTE");
		qualificacao.setVersao("7");
		qualificacao.setTipo(tipo);

		expect(mockTipoQualificacaoRepository.findByDescricao("TESTE")).andReturn(Lists.newArrayList(tipoComId));
		expect(mockQualificacaoRepository.findByDescricaoAndVersao("TESTE", "7")).andReturn(null);
		expect(mockQualificacaoRepository.insert(qualificacao)).andReturn(qualificacao);

		replayAll();

		Qualificacao qualificacaoSalva = null;

		try {
			qualificacaoSalva = facade.novo(qualificacao);
		} catch (BusinessException e) {
			fail();
		}

		verifyAll();

		assertEquals("123", qualificacaoSalva.getTipo().getId());
	}

	@Test
	public void deveriaRetornarSucessoAtualizarTest() {

		TipoQualificacao tipo = new TipoQualificacao();
		tipo.setDescricao("TESTE");

		TipoQualificacao tipoComId = new TipoQualificacao();
		tipoComId.setDescricao("TESTE");
		tipoComId.setId("123");

		Qualificacao qualificacao = new Qualificacao();
		qualificacao.setDescricao("TESTE");
		qualificacao.setVersao("7");
		qualificacao.setTipo(tipo);
		qualificacao.setId("456");

		expect(mockQualificacaoRepository.existsById("456")).andReturn(true);
		expect(mockQualificacaoRepository.findByDescricaoAndVersao("TESTE", "7")).andReturn(null);
		expect(mockTipoQualificacaoRepository.findByDescricao("TESTE")).andReturn(Lists.newArrayList(tipoComId));
		expect(mockQualificacaoRepository.save(qualificacao)).andReturn(qualificacao);

		replayAll();

		Qualificacao qualificacaoSalva = null;

		try {
			qualificacaoSalva = facade.atualizar(qualificacao, "456");
		} catch (BusinessException e) {
			fail();
		}

		verifyAll();

		assertEquals("123", qualificacaoSalva.getTipo().getId());
	}

	@Test
	public void deveriaRetornarErroAtualizarEquivalenciaNotExistsTest() {

		TipoQualificacao tipo = new TipoQualificacao();
		tipo.setDescricao("TESTE");

		TipoQualificacao tipoComId = new TipoQualificacao();
		tipoComId.setDescricao("TESTE");
		tipoComId.setId("123");

		Qualificacao qualificacao = new Qualificacao();
		qualificacao.setDescricao("TESTE");
		qualificacao.setVersao("7");
		qualificacao.setTipo(tipo);
		qualificacao.setId("456");

		Qualificacao innerQualificacao = new Qualificacao();
		innerQualificacao.setDescricao("TESTE 2");
		innerQualificacao.setTipo(tipo);
		innerQualificacao.setId("Q2");

		qualificacao.addEquivalencia(innerQualificacao, 70);

		expect(mockQualificacaoRepository.existsById("456")).andReturn(true);
		expect(mockQualificacaoRepository.findByDescricaoAndVersao("TESTE", "7")).andReturn(null);
		expect(mockTipoQualificacaoRepository.findByDescricao("TESTE")).andReturn(Lists.newArrayList(tipoComId));
		expect(mockQualificacaoRepository.findById("Q2")).andReturn(Optional.empty());

		replayAll();

		try {
			facade.atualizar(qualificacao, "456");
			fail();
		} catch (BusinessException e) {
			assertEquals(BusinessException.class, e.getClass());
			assertEquals(EQUIVALENCIA_INVALIDA, e.getMessage());
		}

		verifyAll();

	}

	@Test
	public void deveriaRetornarErrorPoisJaExisteTest() throws Exception {

		Qualificacao qualificacaoEncontrada = new Qualificacao();
		qualificacaoEncontrada.setId("123");

		Qualificacao qualificacao = new Qualificacao();
		qualificacao.setDescricao("TESTE");
		qualificacao.setVersao("10");

		expect(mockQualificacaoRepository.findByDescricaoAndVersao("TESTE", "10")).andReturn(qualificacaoEncontrada);

		replayAll();

		try {
			facade.novo(qualificacao);
			fail();
		} catch (Exception e) {
			assertEquals(BusinessException.class, e.getClass());
			assertEquals(QUALIFICACAO_JA_EXISTE, e.getMessage());
		}

		verifyAll();

	}

	private void replayAll() {
		replay(mockTipoQualificacaoRepository, mockQualificacaoRepository);
	}

	private void verifyAll() {
		verify(mockTipoQualificacaoRepository, mockQualificacaoRepository);
	}

}
