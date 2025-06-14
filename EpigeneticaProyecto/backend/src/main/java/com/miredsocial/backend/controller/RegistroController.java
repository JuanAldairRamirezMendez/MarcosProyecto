package com.miredsocial.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
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

    @GetMapping("/RegistroCliente")
    public List<RegistroCliente> obtenerClientes() {
        return clienteRepo.findAll();
    }

    @DeleteMapping("/RegistroCliente/{telefono}")
    public void eliminarCliente(@PathVariable Integer telefono) {
        clienteRepo.deleteById(telefono);
    }

    @PostMapping("/RegistroVendedor")
    public RegistroVendedor registrarVendedor(@RequestBody RegistroVendedor vendedor) {
        return vendedorRepo.save(vendedor);
    }

    @GetMapping("/vendedores")
    public List<RegistroVendedor> obtenerVendedores() {
        return vendedorRepo.findAll();
    }

    @DeleteMapping("/RegistroVendedor/{telefono}")
    public void eliminarVendedor(@PathVariable Integer telefono) {
        vendedorRepo.deleteById(telefono);
}
}