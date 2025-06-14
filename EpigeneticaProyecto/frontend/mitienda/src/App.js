import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './estilos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientesTabla from './components/ClientesTabla';
import VendedoresTabla from './components/VendedoresTabla';

function enviarWhatsApp(mensaje) {
  const numero = '51926206841';
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
}

// Componente principal de la página (todo tu contenido menos la tabla)
function MainPage(props) {
  const { t, i18n } = useTranslation();
  const [producto, setProducto] = useState('home');
  const captchaClienteRef = useRef(null);
  const captchaVendedorRef = useRef(null);
  const widgetIdCliente = useRef(null);
  const widgetIdVendedor = useRef(null);
  const siteKey = '6LcU6lYqAAAAAPvmrp5AGW5ZLI20Q03YhRMIPR_T';
  const [modalClienteAbierto, setModalClienteAbierto] = useState(false);
  const [modalVendedorAbierto, setModalVendedorAbierto] = useState(false);

  // Cargar el script SOLO una vez
  useEffect(() => {
    if (!window.grecaptcha) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // Detectar apertura/cierre de modales Bootstrap
  useEffect(() => {
    const clienteModal = document.getElementById('modalRegistroCliente');
    const vendedorModal = document.getElementById('modalRegistroVendedor');
    if (clienteModal) {
      clienteModal.addEventListener('shown.bs.modal', () => setModalClienteAbierto(true));
      clienteModal.addEventListener('hidden.bs.modal', () => setModalClienteAbierto(false));
    }
    if (vendedorModal) {
      vendedorModal.addEventListener('shown.bs.modal', () => setModalVendedorAbierto(true));
      vendedorModal.addEventListener('hidden.bs.modal', () => setModalVendedorAbierto(false));
    }
    // Limpieza
    return () => {
      if (clienteModal) {
        clienteModal.removeEventListener('shown.bs.modal', () => setModalClienteAbierto(true));
        clienteModal.removeEventListener('hidden.bs.modal', () => setModalClienteAbierto(false));
      }
      if (vendedorModal) {
        vendedorModal.removeEventListener('shown.bs.modal', () => setModalVendedorAbierto(true));
        vendedorModal.removeEventListener('hidden.bs.modal', () => setModalVendedorAbierto(false));
      }
    };
  }, []);

  // Renderizar el captcha SOLO cuando el modal esté abierto y el div esté en el DOM
  useEffect(() => {
    if (modalClienteAbierto && window.grecaptcha && captchaClienteRef.current && !widgetIdCliente.current) {
      widgetIdCliente.current = window.grecaptcha.render(captchaClienteRef.current, {
        sitekey: siteKey,
      });
    }
    if (modalVendedorAbierto && window.grecaptcha && captchaVendedorRef.current && !widgetIdVendedor.current) {
      widgetIdVendedor.current = window.grecaptcha.render(captchaVendedorRef.current, {
        sitekey: siteKey,
      });
    }
  }, [modalClienteAbierto, modalVendedorAbierto]);

  const handleRegistroCliente = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombreC.value;
    const email = e.target.emailC.value;
    const telefono = e.target.telefonoC.value;
    const password = e.target.passwordC.value;

    const recaptcha = window.grecaptcha.getResponse(widgetIdCliente.current);
    if (!recaptcha) {
      alert('Por favor, completa el reCAPTCHA.');
      return;
    }

    const user = { telefono, nombre, email, password };

    try {
      const response = await fetch('http://localhost:8080/api/RegistroCliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        alert('¡Registro exitoso!');
        e.target.reset();
        window.grecaptcha.reset(widgetIdCliente.current);
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  const handleRegistroVendedor = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombreV.value;
    const email = e.target.emailV.value;
    const telefono = e.target.telefonoV.value;
    const empresa = e.target.empresaV.value;
    const password = e.target.passwordV.value;

    const recaptcha = window.grecaptcha.getResponse(widgetIdVendedor.current);
    if (!recaptcha) {
      alert('Por favor, completa el reCAPTCHA.');
      return;
    }

    const user = { telefono, nombre, email, password, empresa };

    try {
      const response = await fetch('http://localhost:8080/api/RegistroVendedor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        alert('¡Registro exitoso!');
        e.target.reset();
        window.grecaptcha.reset(widgetIdVendedor.current);
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  // Botón Bootstrap destacado
  const botonTabla = (
    <a
      href="/clientes"
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-success btn-lg mb-4 d-block mx-auto"
      style={{ maxWidth: 300 }}
    >
      <i className="bi bi-table me-2"></i> Ver tabla de clientes
    </a>
  );

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="#" onClick={() => setProducto('home')}>Microempresa</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
              <li className="nav-item">
                <a className={`nav-link${producto === 'home' ? ' active' : ''}`} href="#" onClick={() => setProducto('home')}>{t('inicio')}</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="epigeneticaDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {t('epigenetica')}
                </a>
                <ul className="dropdown-menu" aria-labelledby="epigeneticaDropdown">
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => setProducto('epigenetica')}>{t('que_es_epigenetica')}</a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="productosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {t('productos')}
                </a>
                <ul className="dropdown-menu" aria-labelledby="productosDropdown">
                  <li><a className="dropdown-item" href="#" onClick={() => setProducto('optimend')}>{t('nuevo_optimend')}</a></li>
                  <li><a className="dropdown-item" href="#" onClick={() => setProducto('linq')}>{t('nuevo_linq')}</a></li>
                  <li><a className="dropdown-item" href="#" onClick={() => setProducto('gnmx')}>{t('nuevo_gnmx')}</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="registroDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {t('registrarme')}
                </a>
                <ul className="dropdown-menu" aria-labelledby="registroDropdown">
                  <li>
                    <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalRegistroCliente">{t('como_cliente')}</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalRegistroVendedor">{t('como_vendedor')}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      {/* Modales de registro */}
      <div className="modal fade" id="modalRegistroCliente" tabIndex="-1" aria-labelledby="modalRegistroClienteLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <i className="bi bi-person-circle me-2 animate-bounce"></i>
              <h5 className="modal-title" id="modalRegistroClienteLabel">{t('registro_cliente')}</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label={t('cerrar')}></button>
            </div>
            <div className="modal-body">
              <form id="formRegistroCliente" onSubmit={handleRegistroCliente}>
                <div className="mb-3">
                  <label htmlFor="nombreC" className="form-label">{t('nombre_completo')}</label>
                  <input type="text" className="form-control" id="nombreC" name="nombreC" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailC" className="form-label">{t('correo_electronico')}</label>
                  <input type="email" className="form-control" id="emailC" name="emailC" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefonoC" className="form-label">{t('telefono')}</label>
                  <input type="tel" className="form-control" id="telefonoC" name="telefonoC" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordC" className="form-label">{t('contrasena')}</label>
                  <input type="password" className="form-control" id="passwordC" name="passwordC" required />
                </div>
                <div className="mb-3">
                  {/* Google reCAPTCHA */}
                  <div ref={captchaClienteRef} className="g-recaptcha" data-sitekey={siteKey} id="recaptcha-cliente"></div>
                </div>
                <button type="submit" className="btn btn-primary w-100">{t('registrarme_btn')}</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modalRegistroVendedor" tabIndex="-1" aria-labelledby="modalRegistroVendedorLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <i className="bi bi-person-circle me-2 animate-bounce"></i>
              <h5 className="modal-title" id="modalRegistroVendedorLabel">{t('registro_vendedor')}</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label={t('cerrar')}></button>
            </div>
            <div className="modal-body">
              <form id="formRegistroVendedor" onSubmit={handleRegistroVendedor}>
                <div className="mb-3">
                  <label htmlFor="nombreV" className="form-label">{t('nombre_completo')}</label>
                  <input type="text" className="form-control" id="nombreV" name="nombreV" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailV" className="form-label">{t('correo_electronico')}</label>
                  <input type="email" className="form-control" id="emailV" name="emailV" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefonoV" className="form-label">{t('telefono')}</label>
                  <input type="tel" className="form-control" id="telefonoV" name="telefonoV" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="empresaV" className="form-label">Empresa (opcional)</label>
                  <input type="text" className="form-control" id="empresaV" name="empresaV" />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordV" className="form-label">{t('contrasena')}</label>
                  <input type="password" className="form-control" id="passwordV" name="passwordV" required />
                </div>
                <div className="mb-3">
                  {/* Google reCAPTCHA */}
                  <div ref={captchaVendedorRef} className="g-recaptcha" data-sitekey={siteKey} id="recaptcha-vendedor"></div>
                </div>
                <button type="submit" className="btn btn-success w-100">{t('registrarme_btn')}</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Página informativa Epigenética */}
      {producto === 'epigenetica' && (
        <div className="container my-5">
          <div className="bg-white rounded-4 shadow-lg p-5">
            <h1 className="mb-4 text-success fw-bold">{t('que_es_epigenetica')}</h1>
            {/* Aquí puedes traducir el contenido si lo agregas a tu archivo de traducción */}
            <div className="text-center mt-4">
              <button className="btn btn-outline-primary" onClick={() => setProducto('home')}>{t('volver_inicio')}</button>
            </div>
          </div>
        </div>
      )}

      {/* All Product Details (visible cuando no es home ni epigenetica) */}
      {producto !== 'home' && producto !== 'epigenetica' && (
        <>
          {/* OPTIMEND Section */}
          {producto === 'optimend' && (
            <>
              <section className="container my-5">
                <div className="row align-items-center bg-white rounded-4 shadow-lg p-3">
                  <div className="col-md-5 text-center mb-4 mb-md-0">
                    <img src="imagenes/optimenso.png" className="img-fluid rounded shadow img-producto" alt="Optimend" style={{ maxWidth: "160px" }} />
                  </div>
                  <div className="col-md-7">
                    <h1 className="mb-3 text-primary fw-bold">OPTIMEND</h1>
                    <span className="badge bg-danger mb-3 fs-5">20% {t('off')}</span>
                    <p className="lead mb-4">
                      <strong>{t('optimend_desc')}</strong>
                    </p>
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Fórmula natural, sin parabenos</li>
                      <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Presentación: 250ml</li>
                      <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Resultados visibles desde la primera semana</li>
                      <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Apto para todo tipo de cabello</li>
                    </ul>
                    <a href="#" className="btn btn-warning btn-lg fw-bold px-4 shadow" onClick={() => enviarWhatsApp('¡Quiero comprar OPTIMEND!')}>{t('lo_quiero')}</a>
                  </div>
                </div>
              </section>
              <section className="container mb-5">
                <div className="row g-4">
                  <div className="col-md-8">
                    <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                      <h3 className="mb-3 text-success fw-bold">¿Por qué elegir OPTIMEND?</h3>
                      <p>
                        OPTIMEND es un producto innovador diseñado para fortalecer y dar brillo a tu cabello, utilizando ingredientes naturales y sin parabenos. Su fórmula avanzada actúa desde la raíz hasta las puntas, mejorando la salud capilar y devolviendo la vitalidad perdida por el estrés, la contaminación y el uso de productos agresivos.
                      </p>
                      <ul>
                        <li>Resultados desde la primera aplicación</li>
                        <li>Ideal para hombres y mujeres</li>
                        <li>No deja residuos grasos</li>
                        <li>Fragancia suave y agradable</li>
                      </ul>
                      <h4 className="mt-4 text-primary fw-bold">Modo de uso</h4>
                      <ol>
                        <li>Aplicar una pequeña cantidad sobre el cabello húmedo.</li>
                        <li>Masajear suavemente durante 2-3 minutos.</li>
                        <li>Enjuagar con abundante agua.</li>
                        <li>Usar 2-3 veces por semana para mejores resultados.</li>
                      </ol>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="bg-light rounded-4 p-4 shadow-sm h-100">
                      <h5 className="text-center text-primary mb-3 fw-bold">Ficha Técnica</h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Marca:</strong> Microempresa</li>
                        <li className="list-group-item"><strong>Presentación:</strong> 250ml</li>
                        <li className="list-group-item"><strong>Tipo:</strong> Fortalecedor capilar</li>
                        <li className="list-group-item"><strong>Origen:</strong> Nacional</li>
                      </ul>
                      <div className="text-center mt-4">
                        <a href="https://wa.me/51926206841" target="_blank" rel="noopener noreferrer" className="btn btn-outline-success btn-sm">
                          <i className="bi bi-whatsapp"></i> Consultar por WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* LINQ Section */}
          {producto === 'linq' && (
            <>
              <section className="container my-5">
                <div className="row align-items-center bg-white rounded-4 shadow-lg p-3">
                  <div className="col-md-5 text-center mb-4 mb-md-0">
                    <img src="imagenes/linqo.png" className="img-fluid rounded shadow img-producto" alt="LINQ" style={{ maxWidth: "160px" }} />
                  </div>
                  <div className="col-md-7">
                    <h1 className="mb-3 text-warning fw-bold">LINQ</h1>
                    <span className="badge bg-warning text-dark mb-3 fs-5">{t('mas_vendido')}</span>
                    <p className="lead mb-4">
                      <strong>{t('linq_desc')}</strong>
                    </p>
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Resultados en 7 días</li>
                      <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Presentación: 50ml</li>
                      <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Fórmula avanzada anti-edad</li>
                      <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Apto para todo tipo de piel</li>
                    </ul>
                    <a href="#" className="btn btn-success btn-lg fw-bold px-4 shadow" onClick={() => enviarWhatsApp('¡Quiero comprar LINQ!')}>{t('comprar_ahora')}</a>
                  </div>
                </div>
              </section>
              <section className="container mb-5">
                <div className="row g-4">
                  <div className="col-md-8">
                    <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                      <h3 className="mb-3 text-success fw-bold">¿Por qué elegir LINQ?</h3>
                      <p>
                        LINQ es un tratamiento facial innovador que reduce arrugas y líneas de expresión, brindando resultados visibles en tan solo 7 días. Su fórmula avanzada hidrata, regenera y rotege la piel, devolviéndole su luminosidad natural.
                      </p>
                      <ul>
                        <li>Resultados rápidos y comprobados</li>
                        <li>Ideal para hombres y mujeres</li>
                        <li>No deja sensación grasosa</li>
                        <li>Dermatológicamente probado</li>
                      </ul>
                      <h4 className="mt-4 text-primary fw-bold">Modo de uso</h4>
                      <ol>
                        <li>Limpia tu rostro antes de aplicar LINQ.</li>
                        <li>Aplica una pequeña cantidad en las zonas deseadas.</li>
                        <li>Masajea suavemente hasta su total absorción.</li>
                        <li>Usar diariamente, mañana y noche.</li>
                      </ol>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="bg-light rounded-4 p-4 shadow-sm h-100">
                      <h5 className="text-center text-primary mb-3 fw-bold">Ficha Técnica</h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Marca:</strong> Microempresa</li>
                        <li className="list-group-item"><strong>Presentación:</strong> 50ml</li>
                        <li className="list-group-item"><strong>Tipo:</strong> Tratamiento facial anti-edad</li>
                        <li className="list-group-item"><strong>Origen:</strong> Nacional</li>
                      </ul>
                      <div className="text-center mt-4">
                        <a href="https://wa.me/51926206841" target="_blank" rel="noopener noreferrer" className="btn btn-outline-success btn-sm">
                          <i className="bi bi-whatsapp"></i> Consultar por WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* GNM-X Section */}
          {producto === 'gnmx' && (
            <>
              <section className="container my-5">
                <div className="row align-items-center bg-white rounded-4 shadow-lg p-3">
                  <div className="col-md-5 text-center mb-4 mb-md-0">
                    <img src="imagenes/genomex.png" className="img-fluid rounded shadow img-producto" alt="GNM-X" style={{ maxWidth: "160px" }} />
                  </div>
                  <div className="col-md-7">
                    <h1 className="mb-3 text-success fw-bold">GNM-X</h1>
                    <span className="badge bg-success mb-3 fs-5">{t('edicion_limitada')}</span>
                    <p className="lead mb-4">
                      <strong>{t('gnmx_desc')}</strong>
                    </p>
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Con aceites esenciales</li>
                      <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Aroma relajante</li>
                      <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Presentación: 100ml</li>
                      <li className="list-group-item"><i className="bi bi-check-circle-fill text-success me-2"></i>Edición limitada</li>
                    </ul>
                    <a href="#" className="btn btn-danger btn-lg fw-bold px-4 shadow" onClick={() => enviarWhatsApp('¡Quiero comprar GNM-X!')}>{t('agregar_carrito')}</a>
                  </div>
                </div>
              </section>
              <section className="container mb-5">
                <div className="row g-4">
                  <div className="col-md-8">
                    <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                      <h3 className="mb-3 text-success fw-bold">¿Por qué elegir GNM-X?</h3>
                      <p>
                        GNM-X es un producto premium elaborado con aceites esenciales que cuidan tu piel y el medio ambiente. Su aroma relajante y su fórmula exclusiva lo hacen ideal para quienes uscan bienestar y naturalidad.
                      </p>
                      <ul>
                        <li>Edición limitada</li>
                        <li>Ideal para todo tipo de piel</li>
                        <li>Sin parabenos ni químicos agresivos</li>
                        <li>Fragancia natural y duradera</li>
                      </ul>
                      <h4 className="mt-4 text-primary fw-bold">Modo de uso</h4>
                      <ol>
                        <li>Aplicar una pequeña cantidad sobre la piel limpia.</li>
                        <li>Masajear suavemente hasta su absorción.</li>
                        <li>Usar diariamente para mejores resultados.</li>
                      </ol>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="bg-light rounded-4 p-4 shadow-sm h-100">
                      <h5 className="text-center text-primary mb-3 fw-bold">Ficha Técnica</h5>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Marca:</strong> Microempresa</li>
                        <li className="list-group-item"><strong>Presentación:</strong> 100ml</li>
                        <li className="list-group-item"><strong>Tipo:</strong> Aceite esencial relajante</li>
                        <li className="list-group-item"><strong>Origen:</strong> Nacional</li>
                      </ul>
                      <div className="text-center mt-4">
                        <a href="https://wa.me/51926206841" target="_blank" rel="noopener noreferrer" className="btn btn-outline-success btn-sm">
                          <i className="bi bi-whatsapp"></i> Consultar por WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}

      {/* Página principal solo si no hay producto seleccionado */}
      {producto === 'home' && (
        <div className="container">
          <h2 className="mb-3">{t('descubre_productos')}</h2>
          <p className="mb-4 fs-5 text-secondary">
            {t('descripcion')}
          </p>
          <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
            <div className="col">
              <div className="card h-100 text-center">
                <img src="imagenes/optimenso.png" className="img-fluid rounded shadow img-producto" alt="Optimenso" />
                <div className="card-body">
                  <h5 className="card-title">{t('nuevo_optimend')}</h5>
                  <span className="badge bg-danger mb-2">20% {t('off')}</span>
                  <p className="card-text">{t('optimend_desc')}</p>
                  <a href="#" className="btn btn-warning fw-bold" onClick={() => setProducto('optimend')}>{t('ver_mas')}</a>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 text-center">
                <img src="imagenes/linqo.png" className="img-fluid rounded shadow img-producto" alt="Linqo" />
                <div className="card-body">
                  <h5 className="card-title">{t('nuevo_linq')}</h5>
                  <span className="badge bg-warning text-dark mb-2">{t('mas_vendido')}</span>
                  <p className="card-text">{t('linq_desc')}</p>
                  <a href="#" className="btn btn-success fw-bold" onClick={() => setProducto('linq')}>{t('ver_mas')}</a>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 text-center">
                <img src="imagenes/genomex.png" className="img-fluid rounded shadow img-producto" alt="Genomex" />
                <div className="card-body">
                  <h5 className="card-title">{t('nuevo_gnmx')}</h5>
                  <span className="badge bg-success mb-2">{t('edicion_limitada')}</span>
                  <p className="card-text">{t('gnmx_desc')}</p>
                  <a href="#" className="btn btn-danger fw-bold" onClick={() => setProducto('gnmx')}>{t('ver_mas')}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de clientes */}
          

          {/* Testimonios en Video */}
          <section className="mb-5">
            <h2 className="mb-4 text-center">{t('testimonios_video')}</h2>
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={3}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 120,
                modifier: 2,
                slideShadows: false,
                scale: 0.8
              }}
              loop={true}
              pagination={{ clickable: true }}
              navigation={true}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="ratio ratio-16x9">
                  <iframe src="https://www.youtube.com/embed/VIDEO_ID_1" title="Testimonio 1" allowFullScreen></iframe>
                </div>
                <p className="text-center mt-2">Testimonio 1</p>
              </SwiperSlide>
              <SwiperSlide>
                <div className="ratio ratio-16x9">
                  <iframe src="https://www.youtube.com/embed/VIDEO_ID_2" title="Testimonio 2" allowFullScreen></iframe>
                </div>
                <p className="text-center mt-2">Testimonio 2</p>
              </SwiperSlide>
              <SwiperSlide>
                <div className="ratio ratio-16x9">
                  <iframe src="https://www.youtube.com/embed/VIDEO_ID_3" title="Testimonio 3" allowFullScreen></iframe>
                </div>
                <p className="text-center mt-2">Testimonio 3</p>
              </SwiperSlide>
              <SwiperSlide>
                <div className="ratio ratio-16x9">
                  <iframe src="https://www.youtube.com/embed/VIDEO_ID_4" title="Testimonio 4" allowFullScreen></iframe>
                </div>
                <p className="text-center mt-2">Testimonio 4</p>
              </SwiperSlide>
              <SwiperSlide>
                <div className="ratio ratio-16x9">
                  <iframe src="https://www.youtube.com/embed/VIDEO_ID_5" title="Testimonio 5" allowFullScreen></iframe>
                </div>
                <p className="text-center mt-2">Testimonio 5</p>
              </SwiperSlide>
            </Swiper>
          </section>
        </div>
      )}

      {/* Footer */}
      <footer className="footer-principal py-5">
        <div className="footer-box mx-auto">
          <div className="row justify-content-center mb-2 text-center text-md-start">
            <div className="col-md-5 mb-4 mb-md-0">
              <h2 className="footer-contact-title mb-3">{t('contáctanos')}</h2>
              <h5 className="footer-title">{t('informacion')}</h5>
              <div className="footer-info mb-2">
                <i className="bi bi-telephone-fill me-2"></i>
                {t('telefono1')}
              </div>
              <div className="footer-info mb-2">
                <i className="bi bi-telephone me-2"></i>
                {t('telefono2')}
              </div>
              <div className="footer-info mb-2">
                <i className="bi bi-envelope-fill me-2"></i>
                {t('correo')}
              </div>
              <h5 className="footer-title mt-4">{t('siguenos')}</h5>
              <div className="footer-social mt-2">
                <a href="#" className="footer-social-icon"><i className="bi bi-facebook"></i></a>
                <a href="#" className="footer-social-icon"><i className="bi bi-instagram"></i></a>
              </div>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="footer-title">{t('ubicacion')}</h5>
              <div className="footer-info">
                {t('direccion')}
              </div>
            </div>
            <div className="col-md-3">
              <h5 className="footer-title">{t('horario')}</h5>
              <div className="footer-info">
                {t('horario_info')}
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col text-center">
              <small className="footer-copy">{t('creado_por')}</small>
            </div>
          </div>
          <div>
            <p>{t('saludo')}</p>
            <button onClick={() => i18n.changeLanguage('en')}>English</button>
            <button onClick={() => i18n.changeLanguage('es')}>Español</button>
          </div>
          <div>
    {/* Botón para abrir la tabla de clientes en otra pestaña */}
    <a
    href="/vendedores"
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-primary btn-lg mb-4 d-block mx-auto"
    style={{ maxWidth: 300 }}
    >
    <i className="bi bi-person-badge me-2"></i>
    Ver tabla de vendedores
    </a>
    <a
      href="/clientes"
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary mb-3"
    >
      Ver tabla de clientes
    </a>
  </div>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/clientes" element={<ClientesTabla />} />
        <Route path="/vendedores" element={<VendedoresTabla />} />
      </Routes>
    </Router>
  );
}

export default App;