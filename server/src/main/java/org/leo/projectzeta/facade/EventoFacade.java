package org.leo.projectzeta.facade;

import org.leo.projectzeta.model.Evento;
import org.leo.projectzeta.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

@Service
public class EventoFacade extends AbstractSimpleFacade<Evento> {

	@Autowired
	private EventoRepository repository;

	@Override
	protected MongoRepository<Evento, String> getRepository() {
		return repository;
	}

	@Override
	public Class<Evento> getClasseDaEntidade() {
		return Evento.class;
	}

}
