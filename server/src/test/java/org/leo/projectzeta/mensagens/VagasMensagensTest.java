package org.leo.projectzeta.mensagens;

import static org.easymock.EasyMock.anyObject;
import static org.easymock.EasyMock.capture;
import static org.easymock.EasyMock.eq;
import static org.easymock.EasyMock.expect;
import static org.easymock.EasyMock.replay;
import static org.easymock.EasyMock.reset;
import static org.easymock.EasyMock.verify;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.leo.projectzeta.model.StatusVaga.SELECIONANDO_CANDIDATOS;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.assertj.core.util.Lists;
import org.easymock.Capture;
import org.easymock.EasyMock;
import org.easymock.EasyMockRunner;
import org.easymock.Mock;
import org.easymock.MockType;
import org.easymock.TestSubject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.leo.projectzeta.facade.ProfissionalFacade;
import org.leo.projectzeta.facade.VagaFacade;
import org.leo.projectzeta.model.Profissional;
import org.leo.projectzeta.model.Vaga;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.util.concurrent.ListenableFuture;

import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(EasyMockRunner.class)
public class VagasMensagensTest {

	@TestSubject
	private VagasMensagens vagasMensagens = new VagasMensagens();

	@Mock(type = MockType.STRICT)
	private ProfissionalFacade mockCandidatoFacade;

	@Mock(type = MockType.STRICT)
	private VagaFacade mockVagaFacade;

	@Mock(type = MockType.STRICT)
	private SimpMessagingTemplate mockSimpMessagingTemplate;

	@Mock(type = MockType.STRICT)
	private KafkaTemplate<String, String> mockKafkaTemplate;

	@Mock(type = MockType.STRICT)
	private ListenableFuture<SendResult<String, String>> mockListenableFuture;

	private ObjectMapper objectMapper = new ObjectMapper();

	@Before
	public void setup() {

		vagasMensagens.setObjectMapper(objectMapper);

		reset(getMocks());
	}

	@Test
	public void deveriaSelecionarCandidatosParaVagaTest() throws Exception {

		String strVaga = IOUtils.resourceToString("/vaga.json", StandardCharsets.UTF_8);

		Profissional profissional = new Profissional();
		profissional.setDataComeco(DateUtils.addDays(new Date(), -1));

		Capture<Vaga> vagaCapture = EasyMock.newCapture();

		expect(mockCandidatoFacade.listarTodos()).andReturn(Lists.newArrayList(profissional));
		expect(mockVagaFacade.atualizar(capture(vagaCapture), eq(123L))).andReturn(new Vaga());
		mockSimpMessagingTemplate.convertAndSend(eq("/topic/vagas"), anyObject(Vaga.class));

		replayAll();

		vagasMensagens.processMessage(strVaga);

		verifyAll();

		assertEquals(SELECIONANDO_CANDIDATOS, vagaCapture.getValue().getStatus());
		assertTrue(vagaCapture.getValue().getCandidatos().isEmpty());
	}

	@Test
	public void deveriaNaoSelecionarPoisStatusNaoEstaNovaTest() throws Exception {

		String mensagem = "{\"status\": \"INICIADA\"}";

		replayAll();

		vagasMensagens.processMessage(mensagem);

		verifyAll();

	}

	@Test
	public void deveriaProcessarVagaTest() throws Exception {

		Vaga vaga = new Vaga();
		vaga.setId(123L);

		Capture<String> vagaCapture = EasyMock.newCapture();

		expect(mockKafkaTemplate.send(eq("vagas"), capture(vagaCapture))).andReturn(mockListenableFuture);

		replayAll();

		vagasMensagens.processVaga(vaga);

		verifyAll();

		String strVaga = "{\"id\":\"123\",\"empresa\":null,\"status\":\"NOVA\"";

		assertTrue(vagaCapture.getValue().contains(strVaga));
	}

	private void replayAll() {
		replay(getMocks());
	}

	private void verifyAll() {
		verify(getMocks());
	}

	private Object[] getMocks() {
		return new Object[] { mockCandidatoFacade, mockVagaFacade, mockSimpMessagingTemplate, mockKafkaTemplate };
	}

}
