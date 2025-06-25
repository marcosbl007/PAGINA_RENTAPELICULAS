
// dependencias utilizadas
const express = require('express');
const { register, login} = require('../controllers/authController');

// se crea la ruta
const router = express.Router();

// se especifica la ruta para el registro de usuarios
router.post('/register', register);

// se especifica la ruta para el inicio de sesión
router.post('/login', login);

// se exporta la ruta
module.exports = router;

