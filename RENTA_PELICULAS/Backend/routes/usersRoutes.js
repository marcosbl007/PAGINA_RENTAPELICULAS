
// dependencias utilizadas
const express = require('express');
const { getUsers, deleteUsers, updateUsers, getUserByEmail} = require('../controllers/usersController');

// se crea la ruta
const router = express.Router();

// se especifica la ruta para obtener todos los usuarios
router.get('/', getUsers);

router.get('/:email', getUserByEmail);

// se especifica la ruta para eliminar un usuario
router.delete('/:email', deleteUsers);

// se especifica la ruta para actualizar a un usuario
router.put('/:email', updateUsers);

// se exporta la ruta
module.exports = router;
