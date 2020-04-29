package ru.knastnt.reactAndSpringData;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Version
    @JsonIgnore // не передаёт этот параметр в REST, хотя и без этого тоже не передаёт.
    // Версия передаётся в заголовке в директиве ETag
    private Long version;

    @NonNull
    private String firstName;
    @NonNull
    private String lastName;
    @NonNull
    private String description;
}
