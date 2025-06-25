import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './AdminPage.css';
import logo from '../assets/images/logo.png';
import icon1 from '../assets/images/agregarpelicula.png'; 
import icon2 from '../assets/images/eliminar.png';
import icon3 from '../assets/images/actualizar.png';
import icon4 from '../assets/images/quitar-usuario.png';
import icon5 from '../assets/images/cerrar-sesion.png';

const options = [
  { id: 1, title: 'Agregar película', description: 'Click para agregar películas al catálogo', icon: icon1, link: '/add-movie' },
  { id: 2, title: 'Eliminar película', description: 'Click para eliminar películas del catálogo', icon: icon2, link: '/movie-table' },
  { id: 3, title: 'Actualizar película', description: 'Click para actualizar películas del catálogo', icon: icon3, link: '/update-movie-table' },
  { id: 4, title: 'Eliminar Usuario', description: 'Eliminar usuarios de la base de datos', icon: icon4, link: '/user-table' },
];

const AdminPage = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {

    navigate('/'); 
  };

  return (
    <div className="admin-page">
      <header className="header">
        <img src={logo} alt="Logo" />
        <h1>PopCornflix</h1>
      </header>
      <div className="options-container">
        {options.map((option) => (
          <Link to={option.link} className="option" key={option.id}>
            <div className="option-icon">
              <img src={option.icon} alt={`Icon for ${option.title}`} />
            </div>
            <div className="option-title">{option.title}</div>
            <div className="option-description">{option.description}</div>
          </Link>
        ))}
        <div className="option" onClick={handleLogout}>
          <div className="option-icon">
            <img src={icon5} alt="Icon for Cerrar Sesión" />
          </div>
          <div className="option-title">Cerrar Sesión</div>
          <div className="option-description">Click para salir</div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
