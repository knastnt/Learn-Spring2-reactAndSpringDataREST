package ru.knastnt.reactAndSpringData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity //сообщает Spring Boot об удалении автоматически настроенной политики безопасности и использовании этой
@EnableGlobalMethodSecurity(prePostEnabled = true) //включает защиту на уровне методов с помощью сложных аннотаций @Pre и @Post в Spring Security. Х.З.
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {  // расширяет удобный базовый класс для написания политики

    @Autowired
    private SpringDataJpaUserDetailsService springDataJpaUserDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(this.springDataJpaUserDetailsService)
                .passwordEncoder(Manager.PASSWORD_ENCODER);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {  //основная политика безопасности
        http
                .headers().frameOptions().sameOrigin()  //для работы h2-console. чтобы сделать для конкретного url, читай тут: https://stackoverflow.com/questions/42257402/disable-x-frameoptions-response-header-for-a-url-spring-security-java-config
        .and()
                .authorizeRequests()
                    //Пути, перечисленные в antMatchers (), получают безусловный доступ, поскольку нет никаких причин блокировать статические веб-ресурсы.
                    .antMatchers("/built/**", "/main.css"/*, /-*разрешить консоль без авторизации*-/"/h2-console/**"*/).permitAll()
                    //Все, что не соответствует этой политике, попадает в anyRequest().authenticated(), то есть требует аутентификации.
                    .anyRequest().authenticated()
        .and()
                //предписывается использовать аутентификацию на основе форм и предоставлять доступ к странице входа в систему
                .formLogin()
                    .defaultSuccessUrl("/", true).permitAll()
        .and()
                //Также возможна базовая аутентификация (для curl'а)
                .httpBasic()
        .and()
                //Базовый логин также настроен с отключенной CSRF. Это в основном для демонстраций и не рекомендуется для производственных систем. Тоже для curl'а
                //.csrf().disable()   // отключает весь к чертям
                .csrf().ignoringAntMatchers("/h2-console/**").and()   //отключает только для консоли

                .logout()
                    //Перенаправление пользователя при логауте
                    .logoutSuccessUrl("/");


    }
}
