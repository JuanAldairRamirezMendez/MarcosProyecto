package com.miredsocial.backend.model;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UsuarioService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public String createUser(String username, String rawPassword, String role) {
        String encodedPassword = passwordEncoder.encode(rawPassword);

        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setPassword(encodedPassword);
        usuario.setRole(role);

        userRepository.save(usuario);
        return null;
    }
}
