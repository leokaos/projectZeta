package org.leo.projectzeta.facade;

import java.util.List;
import java.util.Map;

import org.leo.projectzeta.model.Evento;
import org.leo.projectzeta.repository.EventoRepository;
import org.leo.projectzeta.util.MongoFiltroUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class EventoFacade {

	@Autowired
	private MongoTemplate mongoTemplate;

	@Autowired
	private EventoRepository repository;

	public List<Evento> buscarPorFiltro(Map<String, Object> filtro) {

		if (filtro == null || filtro.isEmpty()) {
			return repository.findAll();
		}

		return mongoTemplate.find(MongoFiltroUtil.toQuery(filtro), Evento.class);
	}

}
