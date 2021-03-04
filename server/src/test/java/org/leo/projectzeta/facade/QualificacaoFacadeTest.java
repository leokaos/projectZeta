package org.leo.projectzeta.facade;

import static org.easymock.EasyMock.expect;
import static org.easymock.EasyMock.replay;
import static org.easymock.EasyMock.verify;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.leo.projectzeta.util.Mensagens.*;

import java.util.Optional;

import org.easymock.EasyMockRunner;
import org.easymock.Mock;
import org.easymock.MockType;
import org.easymock.TestSubject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.model.Categoria;
import org.leo.projectzeta.model.Qualificacao;
import org.leo.projectzeta.repository.QualificacaoRepository;
import org.leo.projectzeta.repository.CategoriaRepository;

import com.google.common.collect.Lists;

@RunWith(value = EasyMockRunner.class)
public class QualificacaoFacadeTest {

	@TestSubject
	private QualificacaoFacade facade = new QualificacaoFacade();

	@Mock(type = MockType.STRICT)
	private CategoriaRepository mockCategoriaRepository;

	@Mock(type = MockType.STRICT)
	private QualificacaoRepository mockQualificacaoRepository;

	@Test
	public void deveriaRetornarUmErrorPoisNaoExisteCategoriaTest() {

		Categoria categoria = new Categoria();
		categoria.setDescricao("TESTE");

		Qualificacao qualificacao = new Qualificacao();
		qualificacao.setDescricao("TESTE");
		qualificacao.setVersao("10");
		qualificacao.setCategoria(categoria);

		expect(mockQualificacaoRepository.findByDescricaoAndVersao("TESTE", "10")).andReturn(null);
		expect(mockCategoriaRepository.findByDescricao("TESTE")).andReturn(Lists.newArrayList());

		replayAll();

		try {
			facade.novo(qualificacao);
			fail();
		} catch (BusinessException e) {
			assertEquals(BusinessException.class, e.getClass());
			assertEquals(CATEGORIA_INVALIDA, e.getMessage());
		}

		verifyAll();
	}

	@Test
	public void deveriaRetornarUmErrorPoisExisteMaisDeUmCategoriaTest() {

		Categoria categoria = new Categoria();
		categoria.setDescricao("TESTE");

		Qualificacao qualificacao = new Qualificacao();
		qualificacao.setDescricao("TESTE");
		qualificacao.setVersao("10");
		qualificacao.setCategoria(categoria);

		expect(mockQualificacaoRepository.findByDescricaoAndVersao("TESTE", "10")).andReturn(null);
		expect(mockCategoriaRepository.findByDescricao("TESTE")).andReturn(Lists.newArrayList(categoria, categoria));

		replayAll();

		try {
			facade.novo(qualificacao);
			fail();
		} catch (BusinessException e) {
			assertEquals(BusinessException.class, e.getClass());
			assertEquals(CATEGORIA_INVALIDA, e.getMessage());
		}

		verifyAll();
	}

	@Test
	public void deveriaRetornarSucessoTest() {

		Categoria categoria = new Categoria();
		categoria.setDescricao("TESTE");

		Categoria categoriaComId = new Categoria();
		categoriaComId.setDescricao("TESTE");
		categoriaComId.setId("123");

		Qualificacao qualificacao = new Qualificacao();
		qualificacao.setDescricao("TESTE");
		qualificacao.setVersao("7");
		qualificacao.setCategoria(categoria);

		expect(mockCategoriaRepository.findByDescricao("TESTE")).andReturn(Lists.newArrayList(categoriaComId));
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

		assertEquals("123", qualificacaoSalva.getCategoria().getId());
	}

	@Test
	public void deveriaRetornarSucessoAtualizarTest() {

		Categoria categoria = new Categoria();
		categoria.setDescricao("TESTE");

		Categoria categoriaComId = new Categoria();
		categoriaComId.setDescricao("TESTE");
		categoriaComId.setId("123");

		Qualificacao qualificacao = new Qualificacao();
		qualificacao.setDescricao("TESTE");
		qualificacao.setVersao("7");
		qualificacao.setCategoria(categoria);
		qualificacao.setId("456");

		expect(mockQualificacaoRepository.existsById("456")).andReturn(true);
		expect(mockQualificacaoRepository.findByDescricaoAndVersao("TESTE", "7")).andReturn(null);
		expect(mockCategoriaRepository.findByDescricao("TESTE")).andReturn(Lists.newArrayList(categoriaComId));
		expect(mockQualificacaoRepository.save(qualificacao)).andReturn(qualificacao);

		replayAll();

		Qualificacao qualificacaoSalva = null;

		try {
			qualificacaoSalva = facade.atualizar(qualificacao, "456");
		} catch (BusinessException e) {
			fail();
		}

		verifyAll();

		assertEquals("123", qualificacaoSalva.getCategoria().getId());
	}

	@Test
	public void deveriaRetornarErroAtualizarEquivalenciaNotExistsTest() {

		Categoria categoria = new Categoria();
		categoria.setDescricao("TESTE");

		Categoria categoriaComId = new Categoria();
		categoriaComId.setDescricao("TESTE");
		categoriaComId.setId("123");

		Qualificacao qualificacao = new Qualificacao();
		qualificacao.setDescricao("TESTE");
		qualificacao.setVersao("7");
		qualificacao.setCategoria(categoria);
		qualificacao.setId("456");

		Qualificacao innerQualificacao = new Qualificacao();
		innerQualificacao.setDescricao("TESTE 2");
		innerQualificacao.setCategoria(categoria);
		innerQualificacao.setId("Q2");

		qualificacao.addEquivalencia(innerQualificacao, 70);

		expect(mockQualificacaoRepository.existsById("456")).andReturn(true);
		expect(mockQualificacaoRepository.findByDescricaoAndVersao("TESTE", "7")).andReturn(null);
		expect(mockCategoriaRepository.findByDescricao("TESTE")).andReturn(Lists.newArrayList(categoriaComId));
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
		replay(mockCategoriaRepository, mockQualificacaoRepository);
	}

	private void verifyAll() {
		verify(mockCategoriaRepository, mockQualificacaoRepository);
	}

}
