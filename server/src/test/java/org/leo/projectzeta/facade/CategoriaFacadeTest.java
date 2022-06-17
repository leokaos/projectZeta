package org.leo.projectzeta.facade;

import static org.easymock.EasyMock.expect;
import static org.easymock.EasyMock.replay;
import static org.easymock.EasyMock.verify;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.leo.projectzeta.util.Mensagens.CATEGORIA_JA_EXISTE;
import static org.leo.projectzeta.util.Mensagens.CATEGORIA_JA_TEM_QUALIFICACOES_ASSOCIADAS;
import static org.leo.projectzeta.util.Mensagens.OBJECT_NULO;

import java.util.Optional;

import org.assertj.core.util.Maps;
import org.easymock.EasyMock;
import org.easymock.EasyMockRunner;
import org.easymock.Mock;
import org.easymock.MockType;
import org.easymock.TestSubject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.model.Categoria;
import org.leo.projectzeta.model.Qualificacao;
import org.leo.projectzeta.repository.CategoriaRepository;

import com.google.common.collect.Lists;

@RunWith(value = EasyMockRunner.class)
public class CategoriaFacadeTest {

	@TestSubject
	private CategoriaFacade facade = new CategoriaFacade();

	@Mock(type = MockType.STRICT)
	private CategoriaRepository mockRepository;

	@Mock(type = MockType.STRICT)
	private QualificacaoFacade mockQualificacaoFacade;

	@Test
	public void deveriaRetornarUmErrorPoisJaExisteTest() {

		Categoria categoria = new Categoria();
		categoria.setDescricao("TESTE");

		expect(mockRepository.findByDescricao("TESTE")).andReturn(Lists.newArrayList(new Categoria()));

		replay(mockRepository);

		try {
			facade.novo(categoria);
			fail();
		} catch (BusinessException e) {
			assertEquals(BusinessException.class, e.getClass());
			assertEquals(CATEGORIA_JA_EXISTE, e.getMessage());
		}

		verify(mockRepository);
	}

	@Test
	public void deveriaRetornarUmSucessoPoisNaoExisteTest() {

		Categoria categoria = new Categoria();
		categoria.setDescricao("TESTE");

		expect(mockRepository.findByDescricao("TESTE")).andReturn(Lists.newArrayList());
		expect(mockRepository.save(categoria)).andReturn(categoria);

		replay(mockRepository);

		try {
			facade.novo(categoria);
		} catch (BusinessException e) {
			fail();
		}

		verify(mockRepository);
	}

	@Test
	public void deveriaRetornarErroPoisTemQualificacoesAssociadasTest() {

		Categoria tipo = new Categoria();
		tipo.setId(123L);

		Optional<Categoria> op = Optional.of(tipo);

		expect(mockRepository.existsById(123L)).andReturn(true);
		expect(mockRepository.findById(123L)).andReturn(op);
		expect(mockQualificacaoFacade.buscarPorFiltro(Maps.newHashMap("tipo.id", 123L))).andReturn(Lists.newArrayList(new Qualificacao()));

		replay(mockQualificacaoFacade, mockRepository);

		try {
			facade.removerPorId(123L);
			fail();
		} catch (BusinessException e) {
			assertEquals(BusinessException.class, e.getClass());
			assertEquals(CATEGORIA_JA_TEM_QUALIFICACOES_ASSOCIADAS, e.getMessage());
		}

		verify(mockQualificacaoFacade, mockRepository);
	}

	@Test
	public void deveriaRetornarSucessoAoRemoverTest() {

		Categoria tipo = new Categoria();
		tipo.setId(123L);

		Optional<Categoria> op = Optional.of(tipo);

		expect(mockRepository.existsById(123L)).andReturn(true);
		expect(mockRepository.findById(123L)).andReturn(op);
		expect(mockQualificacaoFacade.buscarPorFiltro(Maps.newHashMap("tipo.id", 123L))).andReturn(Lists.newArrayList());
		mockRepository.delete(EasyMock.anyObject(Categoria.class));

		replay(mockQualificacaoFacade, mockRepository);

		try {
			facade.removerPorId(123L);
		} catch (BusinessException e) {
			fail();
		}

		verify(mockQualificacaoFacade, mockRepository);
	}

	@Test
	public void deveriaRetornarErroPoisIdInvalidoTest() {

		try {
			facade.remover(null);
			fail();
		} catch (BusinessException e) {
			assertEquals(BusinessException.class, e.getClass());
			assertEquals(OBJECT_NULO, e.getMessage());
		}

	}

}
