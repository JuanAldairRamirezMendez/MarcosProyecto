package com.miredsocial.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);

		//Crear una instancia del codificador de contraseñas
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		//La contraseña que deseas codificar 
		String rawPassword = "Juan123.";
		
		String encodedPassword = encoder.encode(rawPassword);

		System.out.println("Contraseña codificada: " + encodedPassword);
	}

}
