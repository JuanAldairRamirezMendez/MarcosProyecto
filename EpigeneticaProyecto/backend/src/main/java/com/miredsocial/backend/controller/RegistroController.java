package com.miredsocial.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.miredsocial.backend.model.RegistroCliente;
import com.miredsocial.backend.model.RegistroVendedor;
import com.miredsocial.backend.repository.RegistroClienteRepository;
import com.miredsocial.backend.repository.RegistroVendedorRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class RegistroController {
    private final RegistroClienteRepository clienteRepo;
    private final RegistroVendedorRepository vendedorRepo;

    public RegistroController(RegistroClienteRepository clienteRepo, RegistroVendedorRepository vendedorRepo) {
        this.clienteRepo = clienteRepo;
        this.vendedorRepo = vendedorRepo;
    }

    @PostMapping("/RegistroCliente")
    public RegistroCliente registrarCliente(@RequestBody RegistroCliente cliente) {
        return clienteRepo.save(cliente);
    }

    @PostMapping("/RegistroVendedor")
    public RegistroVendedor registrarVendedor(@RequestBody RegistroVendedor vendedor) {
        return vendedorRepo.save(vendedor);
    }
}