package com.miredsocial.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.miredsocial.backend.model.UsuarioService;

@Controller
public class LoginController {

    private final UsuarioService usuarioService;

    @Autowired
    public LoginController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/login")
    public String login(@RequestParam(value="error", required = false)String error,
            @RequestParam(value = "logout", required=false) String logout, 
            Model model) {
                if ("true".equals(error)) {
                    model.addAttribute("errorMessage",
                            "Usuario o clave incorrrecto. Por favor intente de nuevo.");
                }
                if ("true".equals(logout)) {
                    model.addAttribute ("logoutMessage", "Ha cerrado su sesión correctamente.");
                }
                return "login";
    }

    public String registerUser (@RequestParam String username,
                                @RequestParam String password,
                                @RequestParam (name = "role", required= false,
                                        defaultValue="USER") String role){
        System.out.println("***********registrar usuario ***********");
        usuarioService.createUser(username, password, role);

        return "redirect:/login";
    }
}
