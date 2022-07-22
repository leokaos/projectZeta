package org.leo.projectzeta.mensagens;

import static org.leo.projectzeta.model.StatusVaga.NOVA;
import static org.leo.projectzeta.websocket.VagaWebSocket.TOPIC_VAGAS;

import java.util.List;

import org.leo.projectzeta.facade.ProfissionalFacade;
import org.leo.projectzeta.facade.VagaFacade;
import org.leo.projectzeta.model.Profissional;
import org.leo.projectzeta.model.Vaga;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class VagasMensagens {

	private static Logger LOGGER = LoggerFactory.getLogger(VagasMensagens.class);

	private static final String VAGAS_TOPIC = "vagas";

	@Autowired
	private ProfissionalFacade profissionalFacade;

	@Autowired
	private VagaFacade vagaFacade;

	@Autowired
	private SimpMessagingTemplate websocket;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private KafkaTemplate<String, String> kafkaTemplate;

	@KafkaListener(topics = VAGAS_TOPIC)
	public void processMessage(String message) {

		try {

			Vaga vaga = objectMapper.readValue(message, Vaga.class);

			if (vaga.comStatus(NOVA)) {

				List<Profissional> todosOsCandidatos = profissionalFacade.listarTodos();

				vaga.selecionarCandidatos(todosOsCandidatos);

				vagaFacade.atualizar(vaga, vaga.getId());

				websocket.convertAndSend(TOPIC_VAGAS, vaga);
			}

		} catch (Exception e) {
			LOGGER.error("Erro ao processar mensagem!", e);
		}
	}

	public void processVaga(Vaga vaga) {
		try {
			kafkaTemplate.send(VAGAS_TOPIC, objectMapper.writeValueAsString(vaga));
		} catch (JsonProcessingException e) {
			LOGGER.error("Erro ao processar mensagem", e);
		}
	}

	public void setObjectMapper(ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
	}

}
