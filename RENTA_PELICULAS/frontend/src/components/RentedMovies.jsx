import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './RentedMovies.css';

const RentedMovies = () => {
  const [rentals, setRentals] = useState([]);
  const [cookies] = useCookies(['user']);
  const email = cookies.user;

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/api/rentals/history/${email}`)
        .then(response => response.json())
        .then(data => setRentals(data))
        .catch(error => console.error('Error fetching rentals:', error));
    }
  }, [email]);

  return (
    <div className="rented-movies-container">
      <h2>Películas Rentadas</h2>
      {rentals.length > 0 ? (
        <table className="rented-movies-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Fecha de Renta</th>
              <th>Fecha de Devolución</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental.id}>
                <td>
                  <img src={rental.movieImage} alt={rental.movieTitle} className="movie-image" />
                </td>
                <td>{rental.movieTitle}</td>
                <td>{rental.rentDate}</td>
                <td>{rental.dueDate}</td>
                <td>{rental.returned ? 'Devuelta' : 'Alquilada'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tienes películas rentadas actualmente.</p>
      )}
    </div>
  );
};

export default RentedMovies;