
// dependencias a utilizar 
const express = require('express');
const { addComments, deleteComments, getCommentsByMovieId } = require('../controllers/commentsController');

// se crea la ruta
const router = express.Router();

// se especifica la ruta para eliminar un comentario
router.delete('/:id', deleteComments);

// se especifica la ruta para agregar un comentario
router.post('/:id', addComments);

// se especifica la ruta para obtener comentarios por id de movie
router.get('/:id', getCommentsByMovieId);

// se exporta la ruta
module.exports = router;