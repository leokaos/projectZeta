package org.leo.projectzeta.controller;

import org.springframework.validation.FieldError;

public class MessageError {

    private String object;
    private String field;
    private String message;

    public MessageError() {
        super();
    }

    public MessageError(String object, String field, String message) {
        this.object = object;
        this.field = field;
        this.message = message;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public static MessageError createFromFieldError(FieldError fieldError) {
        return new MessageError(fieldError.getObjectName(), fieldError.getField(), fieldError.getDefaultMessage());
    }
}
