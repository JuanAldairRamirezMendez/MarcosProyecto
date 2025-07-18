package com.miredsocial.backend.controller;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RequestMapping("/tester")
public class AppController {

    private PasswordEncoder passwordEncoder;
    
    @GetMapping("/tester/registrar")
    public String registrarUser(@RequestParam String username, @RequestParam String clave) {
        //Codificar la contraseña en texto claro antes de almacenarla
        String encodedPassword = passwordEncoder.encode(clave);
        return encodedPassword;
    }
    @GetMapping("/tester/verificar")

    public boolean verificarPassword(@RequestParam String clave, @RequestParam String claveEnco) {
        //verificar si la contraseña en texto coincide con la contraseña codificada
        return passwordEncoder.matches(clave, claveEnco);
    }

    @GetMapping("/admin/resumenVentas")
    public String resumenVentas() {
        return "resumenVentas";
    }
}