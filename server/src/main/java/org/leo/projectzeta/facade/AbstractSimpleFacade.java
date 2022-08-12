package org.leo.projectzeta.facade;

import static org.leo.projectzeta.util.Mensagens.ENTIDADE_INEXISTENTE;
import static org.leo.projectzeta.util.Mensagens.ID_INVALIDO;
import static org.leo.projectzeta.util.Mensagens.OBJECT_NULO;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.leo.projectzeta.api.Entidade;
import org.leo.projectzeta.api.SimpleFacade;
import org.leo.projectzeta.aspect.LogEvent;
import org.leo.projectzeta.aspect.LogId;
import org.leo.projectzeta.aspect.LogObject;
import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.util.QueryUtil;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.context.SecurityContextHolder;

public abstract class AbstractSimpleFacade<T extends Entidade<K>, K> implements SimpleFacade<T, K> {

    @PersistenceContext
    protected EntityManager entityManager;

    @Override
    @LogEvent(operation = "Criar")
    public T novo(@LogObject T t) throws BusinessException {

        if (t == null) {
            throwObjectNulo();
        }

        if (t.hasId()) {
            throwIdInvalido();
        }

        antesSalvar(t);

        T entity = getRepository().save(t);

        depoisSalvar(entity);

        return entity;
    }

    @Override
    @CacheEvict(key = "#id")
    @LogEvent(operation = "Atualizar")
    public T atualizar(@LogObject T t, @LogId K id) throws BusinessException {

        if (t == null) {
            return throwObjectNulo();
        }

        if (!id.equals(t.getId())) {
            throwIdInvalido();
        }

        if (!getRepository().existsById(id)) {
            throwIdInvalido();
        }

        antesSalvar(t);

        T entity = getRepository().save(t);

        depoisSalvar(entity);

        return entity;
    }

    @Override
    public List<T> buscarPorFiltro(Map<String, Object> filtro) {

        if (filtro == null || filtro.isEmpty()) {
            return getRepository().findAll();
        }

        String srcQuery = QueryUtil.from(filtro, getClasseDaEntidade());

        TypedQuery<T> query = entityManager.createQuery(srcQuery, getClasseDaEntidade());

        QueryUtil.bindParameters(query, filtro);

        return query.getResultList();
    }

    @Override
    @Cacheable
    public T buscarPorId(K id) throws BusinessException {

        if (id == null) {
            throwIdInvalido();
        }

        if (!getRepository().existsById(id)) {
            return throwEntidadeInexistente();
        }

        return getRepository().findById(id).orElse(null);
    }

    @Override
    public void remover(T t) throws BusinessException {

        if (t == null) {
            throwObjectNulo();
        }

        if (!t.hasId()) {
            throwIdInvalido();
            return;
        }

        if (!getRepository().existsById(t.getId())) {
            throwIdInvalido();
        }

        removerInterno(t);
    }

    @Override
    @CacheEvict(key = "#id")
    public void removerPorId(K id) throws BusinessException {

        if (id == null) {
            throwIdInvalido();
        }

        if (!getRepository().existsById(id)) {
            throwIdInvalido();
        }

        T entidade = getRepository().findById(id).orElse(null);

        removerInterno(entidade);
    }

    @LogEvent(operation = "Remover")
    private void removerInterno(@LogObject T entidade) throws BusinessException {

        antesRemover(entidade);

        getRepository().delete(entidade);

        depoisRemover(entidade);
    }

    private void throwIdInvalido() throws BusinessException {
        throw new BusinessException(ID_INVALIDO, "", "id");
    }

    private T throwObjectNulo() throws BusinessException {
        throw new BusinessException(OBJECT_NULO, "", "entity");
    }

    private T throwEntidadeInexistente() throws BusinessException {
        throw new BusinessException(ENTIDADE_INEXISTENTE, "", "entity");
    }

    @Override
    public List<T> listarTodos() throws BusinessException {
        return getRepository().findAll();
    }

    protected void antesSalvar(T t) throws BusinessException {

    }

    protected void depoisSalvar(T t) {

    }

    protected void antesRemover(T t) throws BusinessException {

    }

    protected void depoisRemover(T t) {

    }

    protected String getCurrentUserName() {

        KeycloakAuthenticationToken token = (KeycloakAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        KeycloakPrincipal<?> principal = (KeycloakPrincipal<?>) token.getPrincipal();

        return principal.getKeycloakSecurityContext().getToken().getOtherClaims().get("uid").toString();
    }

    protected abstract JpaRepository<T, K> getRepository();

    public abstract Class<T> getClasseDaEntidade();

}
