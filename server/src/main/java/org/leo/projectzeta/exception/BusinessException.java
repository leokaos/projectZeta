package org.leo.projectzeta.exception;

public class BusinessException extends Exception {

    private static final long serialVersionUID = -8235390710050599036L;

    private final String objectName;
    private final String field;

    public BusinessException(String objectName, String field) {
        this.objectName = objectName;
        this.field = field;
    }

    public BusinessException(String message, String objectName, String field) {
        super(message);
        this.objectName = objectName;
        this.field = field;
    }

    public BusinessException(String message, Throwable cause, String objectName, String field) {
        super(message, cause);
        this.objectName = objectName;
        this.field = field;
    }

    public BusinessException(Throwable cause, String objectName, String field) {
        super(cause);
        this.objectName = objectName;
        this.field = field;
    }

    public BusinessException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace, String objectName, String field) {
        super(message, cause, enableSuppression, writableStackTrace);
        this.objectName = objectName;
        this.field = field;
    }

    public String getObjectName() {
        return objectName;
    }

    public String getField() {
        return field;
    }
}
