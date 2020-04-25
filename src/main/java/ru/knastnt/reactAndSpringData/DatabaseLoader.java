package ru.knastnt.reactAndSpringData;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner { //CommandLineRunner so that it gets run after all the beans are created and registered
    private EmployeeRepository employeeRepository;

    public DatabaseLoader(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    @Override
    public void run(String... args) throws Exception {
        Employee newEmployee = new Employee("Frodo", "Baggins", "ring bearer");
        employeeRepository.save(newEmployee);
        newEmployee = new Employee("Nikitos", "Grande", "supplyer");
        employeeRepository.save(newEmployee);
        newEmployee = new Employee("Ivan", "Ivanov", "traktorist");
        employeeRepository.save(newEmployee);
        newEmployee = new Employee("Klava", "Veselova", "prodavec");
        employeeRepository.save(newEmployee);
        newEmployee = new Employee("Petro", "Petrov", "buhgalter");
        employeeRepository.save(newEmployee);
    }
}
