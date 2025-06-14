import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  return (
    <div className="mb-3 text-end">
      <button
        className={`btn btn-sm me-2 ${i18n.language === 'es' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => i18n.changeLanguage('es')}
      >
        Español
      </button>
      <button
        className={`btn btn-sm ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => i18n.changeLanguage('en')}
      >
        English
      </button>
    </div>
  );
};

const VendedoresTabla = () => {
  const [clientes, setClientes] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('http://localhost:8080/api/RegistroVendedor')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error("Error cargando clientes:", err));
  }, []);

  return (
    <div className="container my-5">
      <LanguageSwitcher />
      <h3 className="mb-3">{t('registro_vendedor', 'Vendedores Registrados')}</h3>
      {clientes.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>{t('telefono', 'Teléfono')}</th>
                <th>{t('nombre_completo', 'Nombre')}</th>
                <th>{t('correo_electronico', 'Email')}</th>
                <th>{t('empresa', 'Empresa')}</th>
                <th>{t('contrasena', 'Contraseña')}</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, idx) => (
                <tr key={idx}>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.empresa}</td>
                  <td>{cliente.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>{t('no_hay_vendedores', 'No hay vendedores registrados.')}</p>
      )}
    </div>
  );
};

export default VendedoresTabla;
