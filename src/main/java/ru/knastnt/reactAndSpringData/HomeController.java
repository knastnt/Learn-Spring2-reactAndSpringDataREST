package ru.knastnt.reactAndSpringData;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/")
public class HomeController {

    @GetMapping
    public String index() {
        return "index";
    }

    @PostMapping
    public String index2() {
        return "index";
    }
}
