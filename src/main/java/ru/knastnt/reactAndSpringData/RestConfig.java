package ru.knastnt.reactAndSpringData;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

@Configuration
public class RestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        ExposureConfiguration exposureConfiguration = config.getExposureConfiguration();

        //Убираем ненужные методы
        //exposureConfiguration.forDomainType(Employee.class).disablePutForCreation(); видимо только для создания, т.к. при редактировании put всё равно работает
        exposureConfiguration.forDomainType(Employee.class).withItemExposure((metadata, httpMethods) -> { //можно убрать .forDomainType(Employee.class) и запретить всем
            return httpMethods.disable(HttpMethod.HEAD, HttpMethod.PUT, HttpMethod.OPTIONS);
        });
    }
}
