package ru.knastnt.reactAndSpringData;

import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/*
  Не использую CrudRepository, т.к. не нужно столько методов.
  Вместо него использую просто репозиторий без методов, и назначаю их сам.
  Реализации напишутся сами, на основе имён, всё как всегда.
*/
@RepositoryRestResource(exported = false) //Запрещаю экспортировать этот репозиторий в REST
public interface ManagerRepository extends Repository<Manager, Long> {

    Manager save(Manager manager);

    Manager findByName(String name);

}
