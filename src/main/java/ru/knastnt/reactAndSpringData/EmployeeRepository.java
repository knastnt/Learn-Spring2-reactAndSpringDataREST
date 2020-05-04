package ru.knastnt.reactAndSpringData;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasRole('ROLE_MANAGER')") //Ограничиваем доступ к этому репозиторию только для мэнеджеров
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long> /* он также экстэндит CRUD Repository*/ {

    @Override
    @PreAuthorize("#employee?.manager == null or #employee?.manager?.name == authentication?.name") //сравнивается только name (логин). Знак ? это проверка на null
    Employee save(@Param("employee") Employee entity);

    @Override
    @PreAuthorize("@employeeRepository.findById(#id)?.manager?.name == authentication?.name")
    void deleteById(@Param("id") Long aLong);

    @Override
    @PreAuthorize("#employee?.manager?.name == authentication?.name")
    void delete(@Param("employee") Employee entity);

    //а как же права для остальных методов crud?
}
