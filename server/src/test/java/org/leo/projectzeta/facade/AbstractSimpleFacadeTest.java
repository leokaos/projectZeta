package org.leo.projectzeta.facade;

import static org.easymock.EasyMock.capture;
import static org.easymock.EasyMock.expect;
import static org.easymock.EasyMock.newCapture;
import static org.easymock.EasyMock.replay;
import static org.easymock.EasyMock.reset;
import static org.easymock.EasyMock.verify;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.leo.projectzeta.util.Mensagens.ENTIDADE_INEXISTENTE;
import static org.leo.projectzeta.util.Mensagens.ID_INVALIDO;
import static org.leo.projectzeta.util.Mensagens.OBJECT_NULO;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.easymock.Capture;
import org.easymock.EasyMock;
import org.easymock.EasyMockRunner;
import org.easymock.Mock;
import org.easymock.MockType;
import org.easymock.TestSubject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.leo.projectzeta.api.Entidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

@RunWith(EasyMockRunner.class)
public class AbstractSimpleFacadeTest {

	@Mock(type = MockType.STRICT)
	private JpaRepository<TestEntidade, String> mockRepository;

	@Mock(type = MockType.STRICT)
	private MongoTemplate mockMongoTemplate;

	@Mock(type = MockType.STRICT)
	private EntityManager mockEntityManager;

	@Mock(type = MockType.STRICT)
	private TypedQuery<?> mockQuery;

	@TestSubject
	private TestAbstractSimpleFacade facade = new TestAbstractSimpleFacade(mockRepository, mockEntityManager);

	@Before
	public void resetMocks() {
		reset(mockRepository, mockMongoTemplate, mockQuery, mockEntityManager);
	}

	@Test
	public void deveriaSalvarUmNovoObjetoTest() throws Exception {

		TestEntidade entidade = new TestEntidade(null);

		expect(mockRepository.save(entidade)).andReturn(entidade);

		replay(mockRepository);

		facade.novo(entidade);

		verify(mockRepository);
	}

	@Test
	public void deveriaRetornarErrorPoisObjetoEstaNuloTest() {

		replay(mockRepository);

		try {
			facade.novo(null);
			fail();
		} catch (Exception e) {
			assertEquals(OBJECT_NULO, e.getMessage());
		}

		verify(mockRepository);
	}

	@Test
	public void deveriaRetornarErrorPoisObjetoTemIdTest() {

		replay(mockRepository);

		try {
			facade.novo(new TestEntidade("123"));
			fail();
		} catch (Exception e) {
			assertEquals(ID_INVALIDO, e.getMessage());
		}

		verify(mockRepository);
	}

	@Test
	public void deveriaRetornarErrorAoAtualizarPoisObjetoEstaNuloTest() {

		replay(mockRepository);

		try {
			facade.atualizar(null, "123");
			fail();
		} catch (Exception e) {
			assertEquals(OBJECT_NULO, e.getMessage());
		}

		verify(mockRepository);
	}

	@Test
	public void deveriaRetornarErrorAoAtualizarPoisIdEstaNuloTest() {

		replay(mockRepository);

		try {
			facade.atualizar(new TestEntidade("123"), "");
			fail();
		} catch (Exception e) {
			assertEquals(ID_INVALIDO, e.getMessage());
		}

		verify(mockRepository);
	}

	@Test
	public void deveriaRetornarErrorAoAtualizarPoisIdEstaDiferenteDaEntidadeTest() {

		replay(mockRepository);

		try {
			facade.atualizar(new TestEntidade("123"), "456");
			fail();
		} catch (Exception e) {
			assertEquals(ID_INVALIDO, e.getMessage());
		}

		verify(mockRepository);
	}

	@Test
	public void deveriaRetornarErrorAoAtualizarPoisIdNaoExisteTest() {

		expect(mockRepository.existsById("123")).andReturn(false);

		replay(mockRepository);

		try {
			facade.atualizar(new TestEntidade("123"), "123");
			fail();
		} catch (Exception e) {
			assertEquals(ID_INVALIDO, e.getMessage());
		}

		verify(mockRepository);
	}

	@Test
	public void deveriaAtulizarCorretamenteTest() throws Exception {

		String id = "123";
		TestEntidade entidade = new TestEntidade(id);

		Capture<TestEntidade> captureEntidade = EasyMock.newCapture();

		expect(mockRepository.existsById(id)).andReturn(true);
		expect(mockRepository.save(capture(captureEntidade))).andReturn(entidade);

		replay(mockRepository);

		facade.atualizar(entidade, id);

		verify(mockRepository);

		assertEquals("123", captureEntidade.getValue().getId());
	}

	@Test
	public void deveriaRetornarPoisMapaEstaNuloOuVazioTest() throws Exception {

		expect(mockRepository.findAll()).andReturn(Lists.newArrayList()).times(2);

		replay(mockRepository);

		facade.buscarPorFiltro((Map<String, Object>) null);

		facade.buscarPorFiltro(Maps.newHashMap());

		verify(mockRepository);
	}

	@Test
	public void deveriaBuscarEntidadePorIdTest() throws Exception {

		String id = "123";

		TestEntidade entidadeEsperada = new TestEntidade(id);

		expect(mockRepository.existsById(id)).andReturn(true);
		expect(mockRepository.findById(id)).andReturn(Optional.of(entidadeEsperada));

		replayAll();

		TestEntidade entidade = facade.buscarPorId(id);

		verifyAll();

		assertEquals(entidadeEsperada, entidade);
	}

	@Test
	public void deveriaRetornarErroPoisIdNaoExisteTest() throws Exception {

		expect(mockRepository.existsById("123")).andReturn(false);

		replayAll();

		try {
			facade.buscarPorId("123");
			fail();
		} catch (Exception e) {
			assertEquals(ENTIDADE_INEXISTENTE, e.getMessage());
		}

		verifyAll();

	}

	@Test
	public void deveriaRetornarErroPoisIdEstaNuloTest() throws Exception {

		try {
			facade.buscarPorId(null);
			fail();
		} catch (Exception e) {
			assertEquals(ID_INVALIDO, e.getMessage());
		}
	}

	@Test
	public void deveriaDeletarUmaEntidadeTest() throws Exception {

		TestEntidade testEntidade = new TestEntidade("123");

		expect(mockRepository.existsById("123")).andReturn(true);

		Capture<TestEntidade> captureEntidade = newCapture();

		mockRepository.delete(capture(captureEntidade));

		replayAll();

		facade.remover(testEntidade);

		verifyAll();

		assertEquals(testEntidade, captureEntidade.getValue());
	}

	@Test
	public void deveriaRetornarUmErroPoisEntidadeEstaInvalidoTest() throws Exception {

		try {
			facade.remover(null);
			fail();
		} catch (Exception e) {
			assertEquals(OBJECT_NULO, e.getMessage());
		}

		try {
			facade.remover(new TestEntidade(null));
			fail();
		} catch (Exception e) {
			assertEquals(ID_INVALIDO, e.getMessage());
		}
	}

	@Test
	public void deveriaRetornarErroPoisEntidadeNaoExisteTest() throws Exception {

		TestEntidade testEntidade = new TestEntidade("123");

		expect(mockRepository.existsById("123")).andReturn(false);

		replayAll();

		try {
			facade.remover(testEntidade);
			fail();
		} catch (Exception e) {
			assertEquals(ID_INVALIDO, e.getMessage());
		}

		verifyAll();

	}

	@Test
	public void deveriaDeletarUmaEntidadePorIdTest() throws Exception {

		TestEntidade testEntidade = new TestEntidade("123");

		expect(mockRepository.existsById("123")).andReturn(true);
		expect(mockRepository.findById("123")).andReturn(Optional.of(testEntidade));

		Capture<TestEntidade> captureEntidade = newCapture();
		mockRepository.delete(capture(captureEntidade));

		replayAll();

		facade.removerPorId("123");

		verifyAll();

		assertEquals(testEntidade, captureEntidade.getValue());
	}

	@Test
	public void deveriaRetornarUmErroPoisIdEstaInvalidoTest() throws Exception {

		try {
			facade.removerPorId(null);
			fail();
		} catch (Exception e) {
			assertEquals(ID_INVALIDO, e.getMessage());
		}

		try {
			facade.removerPorId("");
			fail();
		} catch (Exception e) {
			assertEquals(ID_INVALIDO, e.getMessage());
		}
	}

	@Test
	public void deveriaRetornarErrorPoisEntidadeNaoExisteTest() throws Exception {

		expect(mockRepository.existsById("123")).andReturn(false);

		replayAll();

		try {
			facade.removerPorId("123");
			fail();
		} catch (Exception e) {
			assertEquals(ID_INVALIDO, e.getMessage());
		}

		verifyAll();

	}

	@Test
	public void deveriaRetornarTodasAsEntidadesTest() throws Exception {

		List<TestEntidade> resultadoEsperado = Lists.newArrayList(new TestEntidade("123"));

		expect(mockRepository.findAll()).andReturn(resultadoEsperado);

		replayAll();

		List<TestEntidade> resultado = facade.listarTodos();

		verifyAll();

		assertEquals(resultadoEsperado, resultado);
	}

	private void verifyAll() {
		verify(mockRepository, mockMongoTemplate, mockQuery, mockEntityManager);
	}

	private void replayAll() {
		replay(mockRepository, mockMongoTemplate, mockQuery, mockEntityManager);
	}

	private static class TestAbstractSimpleFacade extends AbstractSimpleFacade<TestEntidade, String> {

		private JpaRepository<TestEntidade, String> repository;

		public TestAbstractSimpleFacade(JpaRepository<TestEntidade, String> repository, EntityManager entityManager) {
			super();
			this.entityManager = entityManager;
			this.repository = repository;
		}

		@Override
		protected JpaRepository<TestEntidade, String> getRepository() {
			return repository;
		}

		@Override
		public Class<TestEntidade> getClasseDaEntidade() {
			return TestEntidade.class;
		}

	}

	private static class TestEntidade implements Entidade<String> {

		private static final long serialVersionUID = 1L;

		private String id;

		public TestEntidade(String id) {
			super();
			this.id = id;
		}

		@Override
		public String getId() {
			return id;
		}

	}
}
