package org.leo.projectzeta.aspect;

import java.lang.reflect.Method;
import java.util.Date;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.leo.projectzeta.api.Entidade;
import org.leo.projectzeta.model.Evento;
import org.leo.projectzeta.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

@Aspect
@Configuration
public class AspectConfiguration {

	@Autowired
	private EventoRepository repository;

	@Autowired
	private ObjectMapper objectMapper;

	@Around("@annotation(org.leo.projectzeta.aspect.LogEvent)")
	public Object adicionarEvento(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {

		Object retorno = proceedingJoinPoint.proceed();

		repository.insert(criarEvento(proceedingJoinPoint));

		return retorno;
	}

	private Evento criarEvento(ProceedingJoinPoint proceedingJoinPoint) throws Exception {

		Evento evento = new Evento();

		evento.setDataEvento(new Date());
		evento.setIdEntidade(extrairId(proceedingJoinPoint).toString());
		evento.setEntidade(extrairEntidade(proceedingJoinPoint));
		evento.setTipoEntidade(extrairClasseEntidade(proceedingJoinPoint));
		evento.setOperacao(extrairOperacao(proceedingJoinPoint));

		return evento;
	}

	private Object extrairId(ProceedingJoinPoint proceedingJoinPoint) {

		Object id = extrairValorParamentro(proceedingJoinPoint, LogId.class);

		if (id == null) {

			Object logObject = extrairValorParamentro(proceedingJoinPoint, LogObject.class);

			if (logObject instanceof Entidade) {
				id = ((Entidade) logObject).getId();
			}
		}

		return id;
	}

	private String extrairEntidade(ProceedingJoinPoint proceedingJoinPoint) throws Exception {
		Object valor = extrairValorParamentro(proceedingJoinPoint, LogObject.class);
		return valor != null ? objectMapper.writeValueAsString(valor) : "";
	}

	private String extrairClasseEntidade(ProceedingJoinPoint proceedingJoinPoint) {
		return extrairValorParamentro(proceedingJoinPoint, LogObject.class).getClass().getSimpleName();
	}

	private String extrairOperacao(ProceedingJoinPoint proceedingJoinPoint) {

		Method method = ((MethodSignature) proceedingJoinPoint.getSignature()).getMethod();

		return method.getAnnotation(LogEvent.class).operation();
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	private Object extrairValorParamentro(ProceedingJoinPoint proceedingJoinPoint, Class annotationClass) {

		MethodSignature methodSignature = (MethodSignature) proceedingJoinPoint.getSignature();

		Method method = methodSignature.getMethod();

		for (int i = 0; i < method.getParameters().length; i++) {
			if (method.getParameters()[i].getAnnotation(annotationClass) != null) {
				return proceedingJoinPoint.getArgs()[i];
			}
		}

		return null;
	}

}
