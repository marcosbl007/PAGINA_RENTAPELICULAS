import React, { useEffect, useState } from 'react';
import './UpdateMovieTable.css';

const UpdateMovieTable = () => {
  const [movies, setMovies] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    synopsis: '',
    price: '',
    director: '',
    year: '',
    duration: '',
    genre: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const handleEdit = (movie) => {
    setEditing(movie.id);
    setFormData({
      title: movie.title,
      synopsis: movie.synopsis,
      price: movie.price,
      director: movie.director,
      year: movie.year,
      duration: movie.duration,
      genre: movie.genre,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (id) => {
    fetch(`http://localhost:5000/api/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(updatedMovie => {
        setMovies(movies.map(movie => (movie.id === id ? updatedMovie.movie : movie)));
        setEditing(null);
      })
      .catch(error => console.error('Error updating movie:', error));
  };

  return (
    <div className="movie-table-container">
      <h1 className="movie-table-header">Actualizar Películas</h1>
      <table className="movie-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Synopsis</th>
            <th>Price</th>
            <th>Director</th>
            <th>Year</th>
            <th>Duration</th>
            <th>Genre</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie.id}>
              <td>
                {editing === movie.id ? (
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                ) : (
                  movie.title
                )}
              </td>
              <td>
                {editing === movie.id ? (
                  <textarea
                    name="synopsis"
                    value={formData.synopsis}
                    onChange={handleChange}
                  />
                ) : (
                  movie.synopsis
                )}
              </td>
              <td>
                {editing === movie.id ? (
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                ) : (
                  movie.price
                )}
              </td>
              <td>
                {editing === movie.id ? (
                  <input
                    type="text"
                    name="director"
                    value={formData.director}
                    onChange={handleChange}
                  />
                ) : (
                  movie.director
                )}
              </td>
              <td>
                {editing === movie.id ? (
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                  />
                ) : (
                  movie.year
                )}
              </td>
              <td>
                {editing === movie.id ? (
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                ) : (
                  movie.duration
                )}
              </td>
              <td>
                {editing === movie.id ? (
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                  />
                ) : (
                  movie.genre
                )}
              </td>
              <td>
                {editing === movie.id ? (
                  <button onClick={() => handleUpdate(movie.id)}>Actualizar</button>
                ) : (
                  <button onClick={() => handleEdit(movie)}>Editar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateMovieTable;
