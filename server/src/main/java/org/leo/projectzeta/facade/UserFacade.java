package org.leo.projectzeta.facade;

import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.model.User;
import org.leo.projectzeta.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class UserFacade extends AbstractSimpleFacade<User, String> {

    private UserRepository repository;

    @Autowired
    public UserFacade(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public User buscarPorId(String id) throws BusinessException {

        if (!getCurrentUserName().equalsIgnoreCase(id)) {
            throw new BusinessException("You don't have permission!", "entity");
        }

        return super.buscarPorId(id);
    }

    @Override
    protected JpaRepository<User, String> getRepository() {
        return repository;
    }

    @Override
    public Class<User> getClasseDaEntidade() {
        return User.class;
    }

}
