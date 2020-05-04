package ru.knastnt.reactAndSpringData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler// depricated (Employee.class)
public class SpringDataRestEventHandler {

    private final ManagerRepository managerRepository;

    @Autowired
    public SpringDataRestEventHandler(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }

    @HandleBeforeCreate //дает вам возможность изменить запись сотрудника, прежде чем она будет записана в базу
//    @HandleBeforeSave
    public void applyUserInformationUsingSecurityContext(Employee employee) {

//        String name = SecurityContextHolder.getContext().getAuthentication().getName(); //Получаем имя аутентифицировавшегося
//        Manager manager = this.managerRepository.findByName(name); //Получаем объект по имени
//        if (manager == null) { //Какого чёрта тут происходит?! Тут надо исключение кидать такто
//            Manager newManager = new Manager();
//            newManager.setName(name);
//            newManager.setRoles(new String[]{"ROLE_MANAGER"});
//            manager = this.managerRepository.save(newManager);
//        }
//        employee.setManager(manager);

        //Перед сохранением или изменением сотрудника, если у него менэджер пустой, то присваиваем ему текущего авторизованного
        // ATTENTION!!! Тут подвох. Если используется метор Patch, то всё норм, но если PUT, то зависимости в employee будут null, а это может повлечь уязвимость
        //if (employee.getManager() == null) { //Нужно проверять на сохраненность в контексте, а не на свойство менэджера
        if (employee.getId() == null) { //Если не в БД, то id = null

            String name = SecurityContextHolder.getContext().getAuthentication().getName(); //Получаем имя аутентифицировавшегося
            Manager manager = this.managerRepository.findByName(name); //Получаем объект по имени
            employee.setManager(manager);
        }

    }
}
