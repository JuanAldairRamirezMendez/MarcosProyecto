package com.miredsocial.backend.controller;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @Autowired
    private MessageSource messageSource;

    @GetMapping("/home")
    public String home() {
        return "paginaUsuarios";
    }

    @GetMapping("/saludo")
    public String saludo(Locale locale) {
        return messageSource.getMessage("saludo", null, locale);
    }

    @GetMapping({"/index","/"})
    public String inicio() {
        return "index";
    }
    
    @GetMapping("/admin")
    public String admin() {
        return "paginaAdmin";
    }
}