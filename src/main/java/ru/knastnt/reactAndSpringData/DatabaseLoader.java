package ru.knastnt.reactAndSpringData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
        Manager manager = new Manager("j", /*12345*/"{bcrypt}$2a$10$78lCF/z6/4PRXxJhfPfGQeJre5EP8Z7Tmh50nXtToHVEvKtkNn2dq", new ArrayList<>(Arrays.asList("ROLE_MANAGER")));
        managerRepository.save(manager);


        Employee newEmployee = new Employee("Frodo", "Baggins", "ring bearer", manager);
        employeeRepository.save(newEmployee);
        newEmployee = new Employee("Nikitos", "Grande", "supplyer", manager);
        employeeRepository.save(newEmployee);
        newEmployee = new Employee("Ivan", "Ivanov", "traktorist", manager);
        employeeRepository.save(newEmployee);
        newEmployee = new Employee("Klava", "Veselova", "prodavec", manager);
        employeeRepository.save(newEmployee);
        newEmployee = new Employee("Petro", "Petrov", "buhgalter", manager);
        employeeRepository.save(newEmployee);
    }
}
