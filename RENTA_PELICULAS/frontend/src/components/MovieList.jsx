import React, { useEffect, useState } from 'react';
import MovieItem from './MovieItem';
import './MovieList.css';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/movies')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;
