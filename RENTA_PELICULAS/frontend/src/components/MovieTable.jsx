import React, { useEffect, useState } from 'react';
import './MovieTable.css';

const MovieTable = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/movies/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => setMovies(movies.filter(movie => movie.id !== id)))
      .catch(error => console.error('Error deleting movie:', error));
  };

  return (
    <div className="movie-table-container">
      <h1 className="movie-table-header">Películas Registradas</h1>
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
              <td>{movie.title}</td>
              <td>{movie.synopsis}</td>
              <td>{movie.price}</td>
              <td>{movie.director}</td>
              <td>{movie.year}</td>
              <td>{movie.duration}</td>
              <td>{movie.genre}</td>
              <td>
                <button onClick={() => handleDelete(movie.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
