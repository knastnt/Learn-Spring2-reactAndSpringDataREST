package ru.knastnt.reactAndSpringData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner { //CommandLineRunner so that it gets run after all the beans are created and registered
    private EmployeeRepository employeeRepository;
    private ManagerRepository managerRepository;

    @Autowired
    public DatabaseLoader(EmployeeRepository employeeRepository, ManagerRepository managerRepository) {
        this.employeeRepository = employeeRepository;
        this.managerRepository = managerRepository;
    }

    @Override
    public void run(String... args) throws Exception {
//        Manager manager = new Manager("j", "{bcrypt}" + Manager.PASSWORD_ENCODER.encode("j"), new ArrayList<>(Arrays.asList("ROLE_MANAGER")));
//        Manager manager = new Manager("j", /*12345*/"{bcrypt}$2a$10$78lCF/z6/4PRXxJhfPfGQeJre5EP8Z7Tmh50nXtToHVEvKtkNn2dq", new ArrayList<>(Arrays.asList("ROLE_MANAGER")));
//        managerRepository.save(manager);

        //Создаем двух менэджеров
        Manager greg = this.managerRepository.save(new Manager("greg", "oliver", new ArrayList<>(Arrays.asList("ROLE_MANAGER"))));
        Manager oliver = this.managerRepository.save(new Manager("oliver", "gierke", new ArrayList<>(Arrays.asList("ROLE_MANAGER"))));


        //В наглую аутентифицируем первого менэджера. Без этого Security не даст пользоваться репозиторием
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("greg", "не важно", AuthorityUtils.createAuthorityList("ROLE_MANAGER"))
        );


        Employee newEmployee = new Employee("Frodo", "Baggins", "ring bearer", greg); //Почему-то грёбаный eventHandler не отлавливает эти создания :-/, но в рантайме работает норм
        employeeRepository.save(newEmployee);
        newEmployee = new Employee("Nikitos", "Grande", "supplyer", greg);
        employeeRepository.save(newEmployee);
        newEmployee = new Employee("Ivan", "Ivanov", "traktorist", greg);
        employeeRepository.save(newEmployee);
        this.employeeRepository.save(new Employee("Bilbo", "Baggins", "burglar", greg));
        this.employeeRepository.save(new Employee("Gandalf", "the Grey", "wizard", greg));



        //В наглую аутентифицируем второго менэджера. Без этого Security не даст пользоваться репозиторием
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("oliver", "doesn't matter", AuthorityUtils.createAuthorityList("ROLE_MANAGER")));

        this.employeeRepository.save(new Employee("Samwise", "Gamgee", "gardener", oliver)); //Почему-то грёбаный eventHandler не отлавливает эти создания :-/, но в рантайме работает норм
        this.employeeRepository.save(new Employee("Merry", "Brandybuck", "pony rider", oliver));
        this.employeeRepository.save(new Employee("Peregrin", "Took", "pipe smoker", oliver));

        newEmployee = new Employee("Klava", "Veselova", "prodavec", oliver);
        employeeRepository.save(newEmployee);
        newEmployee = new Employee("Petro", "Petrov", "buhgalter", oliver);
        employeeRepository.save(newEmployee);


        //Очищаем контекст авторизаций
        SecurityContextHolder.clearContext();
    }
}
