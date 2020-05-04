package ru.knastnt.reactAndSpringData;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Type;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
//@RequiredArgsConstructor
@NoArgsConstructor
public class Manager {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NonNull
    @Column(unique = true)
    private String name; //Это будет его уникальный логин. Логин юзеру менять нельзя!

    @NonNull
    @JsonIgnore
    private String password;

    @NonNull
    @ElementCollection(fetch = FetchType.EAGER) //Не пойму, но лень кидает ошибку при аутентификации
    private List<String> roles;

    public Manager(String name, String password, List<String> roles) {
        this.name = name;
        this.setPassword(password);
        this.roles = roles;
    }

    public void setPassword(String password) {
        this.password = /*"{bcrypt}" + */PASSWORD_ENCODER.encode(password);
    }
}
