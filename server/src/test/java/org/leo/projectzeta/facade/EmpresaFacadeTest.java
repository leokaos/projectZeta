package org.leo.projectzeta.facade;

import static org.easymock.EasyMock.capture;
import static org.easymock.EasyMock.expect;
import static org.easymock.EasyMock.replay;
import static org.easymock.EasyMock.verify;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.util.Map;

import org.assertj.core.util.Lists;
import org.easymock.Capture;
import org.easymock.EasyMockRunner;
import org.easymock.Mock;
import org.easymock.MockType;
import org.easymock.TestSubject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.model.Empresa;
import org.leo.projectzeta.model.Vaga;
import org.leo.projectzeta.util.Mensagens;

@RunWith(value = EasyMockRunner.class)
public class EmpresaFacadeTest {

	@TestSubject
	private EmpresaFacade empresaFacade = new EmpresaFacade();

	@Mock(type = MockType.STRICT)
	private VagaFacade mockVagaFacade;

	@Test
	public void deveriaRetornarErroPoisAEmpresaTemUmaVagaAssociadaTest() throws Exception {

		Empresa empresa = new Empresa();
		empresa.setId(123L);

		Capture<Map<String, Object>> captureFiltro = Capture.newInstance();
		expect(mockVagaFacade.buscarPorFiltro(capture(captureFiltro))).andReturn(Lists.newArrayList(new Vaga()));

		replayAll();

		try {
			empresaFacade.antesRemover(empresa);
			fail();
		} catch (BusinessException ex) {
			assertEquals(Mensagens.EMPRESA_POSSUI_VAGAS, ex.getMessage());
			assertEquals("empresa", ex.getObjectName());
			assertEquals("vaga", ex.getField());
		}

		verifyAll();

		assertEquals(captureFiltro.getValue().get("empresa.id"), 123L);
	}

	private void replayAll() {
		replay(mockVagaFacade);
	}

	private void verifyAll() {
		verify(mockVagaFacade);
	}
}