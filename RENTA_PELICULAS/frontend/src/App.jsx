// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import UserTable from './components/UserTable';
import MovieTable from './components/MovieTable';
import AddMoviePage from './pages/AddMoviePage';
import UpdateMovieTable from './components/UpdateMovieTable';
import EditProfilePage from './pages/EditProfilePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import RentMovie from './components/RentMovie';
import RentedMovies from './components/RentedMovies';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user-table" element={<UserTable />} />
        <Route path="/movie-table" element={<MovieTable />} />
        <Route path="/add-movie" element={<AddMoviePage />} />
        <Route path="/update-movie-table" element={<UpdateMovieTable />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/rent-movie" element={<RentMovie />} />
        <Route path="/rented-movies" element={<RentedMovies />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="/" element={
          <>
            <Header />
            <HomePage />
          </>
        } />
        <Route path="/movies" element={
          <>
            <Header />
            <MoviesPage />
          </>
        } />
      </Routes>
    </div>
  );
};

export default App;
