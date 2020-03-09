package org.leo.projectzeta.facade;

import static org.easymock.EasyMock.expect;
import static org.easymock.EasyMock.replay;
import static org.easymock.EasyMock.verify;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.leo.projectzeta.util.Mensagens.OBJECT_NULO;
import static org.leo.projectzeta.util.Mensagens.TIPO_QUALIFICACAO_JA_EXISTE;
import static org.leo.projectzeta.util.Mensagens.TIPO_QUALIFICACAO_JA_TEM_QUALIFICACOES_ASSOCIADAS;

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
import org.leo.projectzeta.model.Qualificacao;
import org.leo.projectzeta.model.TipoQualificacao;
import org.leo.projectzeta.repository.TipoQualificacaoRepository;

import com.google.common.collect.Lists;

@RunWith(value = EasyMockRunner.class)
public class TipoQualificacaoFacadeTest {

	@TestSubject
	private TipoQualificacaoFacade facade = new TipoQualificacaoFacade();

	@Mock(type = MockType.STRICT)
	private TipoQualificacaoRepository mockRepository;

	@Mock(type = MockType.STRICT)
	private QualificacaoFacade mockQualificacaoFacade;

	@Test
	public void deveriaRetornarUmErrorPoisJaExisteTest() {

		TipoQualificacao tipoQualificacao = new TipoQualificacao();
		tipoQualificacao.setDescricao("TESTE");

		expect(mockRepository.findByDescricao("TESTE")).andReturn(Lists.newArrayList(new TipoQualificacao()));

		replay(mockRepository);

		try {
			facade.novo(tipoQualificacao);
			fail();
		} catch (BusinessException e) {
			assertEquals(BusinessException.class, e.getClass());
			assertEquals(TIPO_QUALIFICACAO_JA_EXISTE, e.getMessage());
		}

		verify(mockRepository);
	}

	@Test
	public void deveriaRetornarUmSucessoPoisNaoExisteTest() {

		TipoQualificacao tipoQualificacao = new TipoQualificacao();
		tipoQualificacao.setDescricao("TESTE");

		expect(mockRepository.findByDescricao("TESTE")).andReturn(Lists.newArrayList());
		expect(mockRepository.insert(tipoQualificacao)).andReturn(tipoQualificacao);

		replay(mockRepository);

		try {
			facade.novo(tipoQualificacao);
		} catch (BusinessException e) {
			fail();
		}

		verify(mockRepository);
	}

	@Test
	public void deveriaRetornarErroPoisTemQualificacoesAssociadasTest() {

		TipoQualificacao tipo = new TipoQualificacao();
		tipo.setId("123");

		Optional<TipoQualificacao> op = Optional.of(tipo);

		expect(mockRepository.existsById("123")).andReturn(true);
		expect(mockRepository.findById("123")).andReturn(op);
		expect(mockQualificacaoFacade.buscarPorFiltro(Maps.newHashMap("tipo.id", "123"))).andReturn(Lists.newArrayList(new Qualificacao()));

		replay(mockQualificacaoFacade, mockRepository);

		try {
			facade.removerPorId("123");
			fail();
		} catch (BusinessException e) {
			assertEquals(BusinessException.class, e.getClass());
			assertEquals(TIPO_QUALIFICACAO_JA_TEM_QUALIFICACOES_ASSOCIADAS, e.getMessage());
		}

		verify(mockQualificacaoFacade, mockRepository);
	}

	@Test
	public void deveriaRetornarSucessoAoRemoverTest() {

		TipoQualificacao tipo = new TipoQualificacao();
		tipo.setId("123");

		Optional<TipoQualificacao> op = Optional.of(tipo);

		expect(mockRepository.existsById("123")).andReturn(true);
		expect(mockRepository.findById("123")).andReturn(op);
		expect(mockQualificacaoFacade.buscarPorFiltro(Maps.newHashMap("tipo.id", "123"))).andReturn(Lists.newArrayList());
		mockRepository.delete(EasyMock.anyObject(TipoQualificacao.class));

		replay(mockQualificacaoFacade, mockRepository);

		try {
			facade.removerPorId("123");
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
