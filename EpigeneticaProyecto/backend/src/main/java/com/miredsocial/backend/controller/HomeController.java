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

    @GetMapping("/")
    public String home() {
        return "Backend funcionando";
    }

    @GetMapping("/saludo")
    public String saludo(Locale locale) {
        return messageSource.getMessage("saludo", null, locale);
    }
}