import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const ModalRegistro = ({ show, handleClose, tipo }) => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    password: '',
    captcha: ''
  });
  const [error, setError] = useState('');

  const numero = '51926206841'; // Tu número de WhatsApp

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registrarUsuario = (nuevoUsuario) => {
    fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario)
    })
      .then(res => res.json())
      .then(data => {
        alert("Usuario registrado: " + data.username);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Cambia el captcha según el tipo
    const captchaCorrecto = tipo === 'cliente' ? 'C4ptCh4' : 'captcha54';
    if (form.captcha !== captchaCorrecto) {
      setError('Código de seguridad incorrecto.');
      return;
    }
    setError('');

    // Llama a registrarUsuario aquí
    registrarUsuario({
      username: form.nombre,
      email: form.email,
      passwordHash: form.password,
      fullName: form.nombre,
      bio: "",
      profilePictureUrl: "",
      createdAt: new Date()
    });

    let mensaje = '';
    if (tipo === 'cliente') {
      mensaje = `Registro de Cliente:%0A
      Nombre: ${form.nombre}%0A
      Correo: ${form.email}%0A
      Teléfono: ${form.telefono}%0A
      Contraseña: ${form.password}`;
    } else {
      mensaje = `Registro de Vendedor:%0A
      Nombre: ${form.nombre}%0A
      Correo: ${form.email}%0A
      Teléfono: ${form.telefono}%0A
      Empresa: ${form.empresa}%0A
      Contraseña: ${form.password}`;
    }
    window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
    handleClose();
    setForm({
      nombre: '',
      email: '',
      telefono: '',
      empresa: '',
      password: '',
      captcha: ''
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registro {tipo === 'cliente' ? 'de Cliente' : 'de Vendedor'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control name="nombre" value={form.nombre} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control name="telefono" value={form.telefono} onChange={handleChange} required />
          </Form.Group>
          {tipo === 'vendedor' && (
            <Form.Group className="mb-2">
              <Form.Label>Empresa</Form.Label>
              <Form.Control name="empresa" value={form.empresa} onChange={handleChange} required />
            </Form.Group>
          )}
          <Form.Group className="mb-2">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Código de seguridad</Form.Label>
            <Form.Control name="captcha" value={form.captcha} onChange={handleChange} required placeholder={tipo === 'cliente' ? 'C4ptCh4' : 'captcha54'} />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button variant="primary" type="submit" className="w-100 mt-2">
            Registrarme
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegistro;