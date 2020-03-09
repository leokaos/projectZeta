package org.leo.projectzeta.exception;

public class BusinessException extends Exception {

	private static final long serialVersionUID = -8235390710050599036L;

	public BusinessException() {
		super();
	}

	public BusinessException(String message, Throwable cause) {
		super(message, cause);
	}

	public BusinessException(String message) {
		super(message);
	}

	public BusinessException(Throwable cause) {
		super(cause);
	}

}
