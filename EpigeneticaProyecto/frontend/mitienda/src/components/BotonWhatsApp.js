import React from 'react';

const BotonWhatsApp = ({ mensaje, texto, color }) => {
  const numero = '51926206841'; // Tu número con código de país

  const handleClick = (e) => {
    e.preventDefault();
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <a href="#" className={`btn fw-bold ${color}`} onClick={handleClick}>
      {texto}
    </a>
  );
};

export default BotonWhatsApp;