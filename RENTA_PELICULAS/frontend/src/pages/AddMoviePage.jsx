import React, { useState } from 'react';
import './AddMoviePage.css';
import { useNavigate } from 'react-router-dom';

const AddMoviePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    synopsis: '',
    price: '',
    director: '',
    year: '',
    duration: '',
    genre: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        navigate('/admin');
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-movie-page">
      <h1 className="header">Agregar Película</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input type="text" id="title" name="title" placeholder="Título" value={formData.title} onChange={handleChange} />
        </div>
        <div className="form-group large">
          <label htmlFor="synopsis">Sinopsis</label>
          <textarea id="synopsis" name="synopsis" placeholder="Sinopsis" value={formData.synopsis} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio de alquiler</label>
          <input type="text" id="price" name="price" placeholder="Precio de alquiler" value={formData.price} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="director">Director</label>
          <input type="text" id="director" name="director" placeholder="Director" value={formData.director} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="year">Año de estreno</label>
          <input type="text" id="year" name="year" placeholder="Año de estreno" value={formData.year} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duración</label>
          <input type="text" id="duration" name="duration" placeholder="Duración" value={formData.duration} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Género</label>
          <input type="text" id="genre" name="genre" placeholder="Género" value={formData.genre} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="image">Elegir archivo</label>
          <input type="file" id="image" name="image" onChange={handleChange} />
          {formData.image && <img src={formData.image} alt="Preview" className="image-preview" />}
        </div>
        <div className="button-group">
          <button type="button" className="cancel-button" onClick={() => navigate('/admin')}>Cancelar</button>
          <button type="submit" className="confirm-button">Confirmar</button>
        </div>
      </form>
    </div>
  );
};

export default AddMoviePage;
