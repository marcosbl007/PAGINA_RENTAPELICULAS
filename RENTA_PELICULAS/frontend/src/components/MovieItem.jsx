
import React from 'react';
import { Link } from 'react-router-dom';
import './MovieItem.css';

const MovieItem = ({ movie }) => {
  return (
    <div className="movie-item">
      <Link to={`/movies/${movie.id}`}>
        <img src={movie.image} alt={`${movie.title} poster`} />
        <div className="movie-details">
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <p>{movie.genre}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieItem;
