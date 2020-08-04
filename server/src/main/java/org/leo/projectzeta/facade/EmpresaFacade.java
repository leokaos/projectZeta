package org.leo.projectzeta.facade;

import com.google.common.collect.Maps;
import io.micrometer.core.instrument.util.StringUtils;
import org.leo.projectzeta.exception.BusinessException;
import org.leo.projectzeta.model.Empresa;
import org.leo.projectzeta.repository.EmpresaRepository;
import org.leo.projectzeta.util.Mensagens;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EmpresaFacade extends AbstractSimpleFacade<Empresa> {

    @Autowired
    private EmpresaRepository repository;

    @Autowired
    private VagaFacade vagaFacade;

    @Override
    protected void antesRemover(Empresa empresa) throws BusinessException {

        if (StringUtils.isNotEmpty(empresa.getId())) {

            Map<String, Object> filtro = Maps.newHashMap();
            filtro.put("empresa.id", empresa.getId());

            if (!vagaFacade.buscarPorFiltro(filtro).isEmpty()) {
                throw new BusinessException(Mensagens.EMPRESA_POSSUI_VAGAS, "empresa", "vaga");
            }
        }
    }

    @Override
    protected MongoRepository<Empresa, String> getRepository() {
        return repository;
    }

    @Override
    public Class<Empresa> getClasseDaEntidade() {
        return Empresa.class;
    }

}
