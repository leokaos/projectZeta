package org.leo.projectzeta.factory;

import org.leo.projectzeta.model.Evento;

public class EventoFactory {

	private EventoFactory() {
		super();
	}

	public static Evento criar() {
		return new Evento();
	}

}
