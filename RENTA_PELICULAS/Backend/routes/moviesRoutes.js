// dependencias utilizadas
const express = require('express');
const { addMovies, getMovies, updateMovies, deleteMovies, getAvailableMovies, getMovieById } = require('../controllers/moviesController');

// se crea la ruta
const router = express.Router();

// se especifica la ruta para agregar una película
router.post('/', addMovies);

// se especifica la ruta para obtener todas las películas
router.get('/', getMovies);

// se especifica la ruta para obtener una pelicula por id 
router.get('/:id', getMovieById);

// se especifica la ruta para actualizar una película
router.put('/:id', updateMovies);

// se especifica la ruta para eliminar una película
router.delete('/:id', deleteMovies);

// se especifica la ruta para obtener el catálogo de las peliculas disponibles para el user
router.get('/available/:email', getAvailableMovies);

// se exporta la ruta
module.exports = router;