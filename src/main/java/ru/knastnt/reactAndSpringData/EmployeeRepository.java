package ru.knastnt.reactAndSpringData;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long>, PagingAndSortingRepository<Employee, Long> {
}
