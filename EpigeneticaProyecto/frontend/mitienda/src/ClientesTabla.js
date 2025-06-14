import React, { useEffect, useState } from 'react';

const ClientesTabla = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/RegistroCliente')
      .then(res => res.json())
      .then(data => setClientes(data))
      .catch(err => console.error("Error cargando clientes:", err));
  }, []);

  return (
    <div className="container my-5">
      <h3 className="mb-3">Clientes Registrados</h3>
      {clientes.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>Teléfono</th>
                <th>Nombre</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, idx) => (
                <tr key={idx}>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay clientes registrados.</p>
      )}
    </div>
  );
};

export default ClientesTabla;