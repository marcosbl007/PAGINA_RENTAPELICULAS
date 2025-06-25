import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const RentMovie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [cookies] = useCookies(['user']);
  const email = cookies.user;

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const handleRent = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/rentals/rent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, movieId: parseInt(selectedMovie) }),
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error renting movie:', error);
    }
  };

  return (
    <div>
      <h2>Rentar Película</h2>
      <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
        <option value="">Selecciona una película</option>
        {movies.map((movie) => (
          <option key={movie.id} value={movie.id}>{movie.title}</option>
        ))}
      </select>
      <button onClick={handleRent}>Rentar</button>
    </div>
  );
};

export default RentMovie;