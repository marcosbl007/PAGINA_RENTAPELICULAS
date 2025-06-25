import React from 'react';
import MovieList from '../components/MovieList';
import './MoviesPage.css';

const MoviesPage = () => {
    return (
        <div className="movies-page">
            <MovieList />
        </div>
    );
};

export default MoviesPage;
