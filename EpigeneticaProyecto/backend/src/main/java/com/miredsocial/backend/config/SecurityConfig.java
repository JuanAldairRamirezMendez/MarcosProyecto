package com.miredsocial.backend.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;


@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }  
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors() // 🔥 habilita CORS
                .and()
                .csrf(csrf -> csrf.ignoringRequestMatchers("/logout"))
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/api/Registro_Cliente", "/api/Registro_Vendedor").permitAll()
                    .requestMatchers("/i18n/**").hasRole("I18N")
                    .requestMatchers("/api/**").hasAnyRole("ADMIN", "API")
                    .anyRequest().authenticated()
                )
                .httpBasic()
                .and()
                .logout(logout -> logout
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("/login?logout"))
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // tu frontend
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // si usas cookies o Authorization header

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        return new InMemoryUserDetailsManager(
            User.withUsername("admin1").password(encoder.encode("adminpass1")).roles("ADMIN").build(),
            User.withUsername("admin2").password(encoder.encode("adminpass2")).roles("ADMIN").build(),
            User.withUsername("apiuser1").password(encoder.encode("apipass1")).roles("API").build(),
            User.withUsername("apiuser2").password(encoder.encode("apipass2")).roles("API").build(),
            User.withUsername("i18nuser").password(encoder.encode("i18npass")).roles("I18N").build()
        );
    }
}
