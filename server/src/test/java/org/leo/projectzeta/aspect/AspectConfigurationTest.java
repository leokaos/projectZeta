package org.leo.projectzeta.aspect;

import static java.util.Calendar.MINUTE;
import static org.apache.commons.lang3.time.DateUtils.truncatedEquals;
import static org.easymock.EasyMock.capture;
import static org.easymock.EasyMock.expect;
import static org.easymock.EasyMock.replay;
import static org.easymock.EasyMock.verify;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.lang.reflect.Method;
import java.util.Date;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.easymock.Capture;
import org.easymock.EasyMockRunner;
import org.easymock.Mock;
import org.easymock.MockType;
import org.easymock.TestSubject;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.leo.projectzeta.api.Entidade;
import org.leo.projectzeta.facade.AbstractSimpleFacade;
import org.leo.projectzeta.model.Evento;
import org.leo.projectzeta.repository.EventoRepository;

import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(EasyMockRunner.class)
public class AspectConfigurationTest {

	@TestSubject
	private AspectConfiguration aspect = new AspectConfiguration();

	@Mock(type = MockType.NICE)
	private ProceedingJoinPoint mockJP;

	@Mock(type = MockType.NICE)
	private MethodSignature mockSignature;

	@Mock(type = MockType.NICE)
	private EventoRepository mockEventoRepository;

	@Mock(type = MockType.NICE)
	private ObjectMapper mockObjectMapper;

	@Test
	public void deveriaCriarEventoComIdForaDaClasseTest() throws Throwable {

		Object[] args = new Object[] { getTestEntidade("1234"), "123" };

		expect(mockJP.proceed()).andReturn("");
		expect(mockJP.getSignature()).andReturn(mockSignature).anyTimes();
		expect(mockSignature.getMethod()).andReturn(getSampleMethod("atualizar")).anyTimes();
		expect(mockJP.getArgs()).andReturn(args).anyTimes();

		Capture<Evento> captureEvento = Capture.newInstance();

		expect(mockEventoRepository.insert(capture(captureEvento))).andReturn(new Evento());

		replay(mockJP, mockSignature, mockEventoRepository, mockObjectMapper);

		aspect.adicionarEvento(mockJP);

		verify(mockJP, mockSignature, mockEventoRepository, mockObjectMapper);

		Evento evento = captureEvento.getValue();

		assertTrue(truncatedEquals(new Date(), evento.getDataEvento(), MINUTE));
		assertEquals("Atualizar", evento.getOperacao());
		assertEquals("123", evento.getIdEntidade());
		assertEquals("TestEntidade", evento.getTipoEntidade());
	}

	@Test
	public void deveriaCriarEventoComIdDaClasseTest() throws Throwable {

		Object[] args = new Object[] { getTestEntidade("123") };

		expect(mockJP.proceed()).andReturn("");
		expect(mockJP.getSignature()).andReturn(mockSignature).anyTimes();
		expect(mockSignature.getMethod()).andReturn(getSampleMethod("removerInterno")).anyTimes();
		expect(mockJP.getArgs()).andReturn(args).anyTimes();

		Capture<Evento> captureEvento = Capture.newInstance();

		expect(mockEventoRepository.insert(capture(captureEvento))).andReturn(new Evento());

		replay(mockJP, mockSignature, mockEventoRepository, mockObjectMapper);

		aspect.adicionarEvento(mockJP);

		verify(mockJP, mockSignature, mockEventoRepository, mockObjectMapper);

		Evento evento = captureEvento.getValue();

		assertTrue(truncatedEquals(new Date(), evento.getDataEvento(), MINUTE));
		assertEquals("Remover", evento.getOperacao());
		assertEquals("123", evento.getIdEntidade());
		assertEquals("TestEntidade", evento.getTipoEntidade());
	}

	private Method getSampleMethod(String nomeMetodo) {

		for (Method method : AbstractSimpleFacade.class.getDeclaredMethods()) {
			if (method.getName().equalsIgnoreCase(nomeMetodo)) {
				return method;
			}
		}

		return null;
	}

	private Entidade getTestEntidade(final String id) {
		return new TestEntidade(id);
	}

	private static class TestEntidade implements Entidade {

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
