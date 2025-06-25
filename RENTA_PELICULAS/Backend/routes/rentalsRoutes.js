
// dependencias a utilizar 
const express = require('express');
const { rentMovie, returnMovie, getRentalsHistory } = require('../controllers/rentalsController');

// se crea la ruta
const router = express.Router();

// se especifica la ruta para rentar una película
router.post('/rent', rentMovie);

// se especifica la ruta para devolver una película
router.post('/return', returnMovie);

// se especifica la ruta para obtener el historial de alquileres de un usuario
router.get('/history/:email', getRentalsHistory);

// se exporta la ruta
module.exports = router;