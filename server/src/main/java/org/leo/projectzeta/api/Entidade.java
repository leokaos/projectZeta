package org.leo.projectzeta.api;

import java.io.Serializable;

public interface Entidade<T> extends Serializable {

	T getId();

	default boolean hasId() {
		return getId() != null;
	}

}
