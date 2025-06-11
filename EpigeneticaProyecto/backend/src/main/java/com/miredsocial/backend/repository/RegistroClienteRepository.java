package com.miredsocial.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.miredsocial.backend.model.RegistroCliente;

public interface RegistroClienteRepository extends JpaRepository<RegistroCliente, Integer> {}