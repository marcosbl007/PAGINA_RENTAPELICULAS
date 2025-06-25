// controllers/commentsController.js
const { dataComments, updateCommentsFile } = require('../data/comments');
const { dataMovies } = require('../data/movies');
const { dataUsers } = require('../data/users');

// Eliminar un comentario por id
exports.deleteComments = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const userEmail = req.body.email; // Obtener el email del usuario desde el cuerpo de la petición
    const commentIndex = dataComments.findIndex(comment => comment.id === id);

    if (commentIndex === -1) {
        res.status(404).send({ message: "Comentario no encontrado" });
    } else if (dataComments[commentIndex].email !== userEmail) {
        res.status(403).send({ message: "No tienes permiso para eliminar este comentario" });
    } else {
        dataComments.splice(commentIndex, 1);
        updateCommentsFile();
        res.json({ message: "Comentario eliminado correctamente" });
    }
};

// Agregar un comentario
exports.addComments = (req, res) => {
    const movieId = parseInt(req.params.id, 10);
    const { comment, email } = req.body;

    const movie = dataMovies.find(movie => movie.id === movieId);
    const user = dataUsers.find(user => user.email === email);

    if (!movie) {
        return res.status(404).json({ message: 'Película no encontrada' });
    }

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const localDate = new Date().toLocaleString();

    const newComment = {
        id: dataComments.length + 1,
        comment,
        email,
        name: user.name, // Incluir el nombre del usuario
        movieId,
        date: localDate
    };

    dataComments.push(newComment);
    updateCommentsFile();
    res.status(201).json({ message: 'Comentario agregado exitosamente', comment: newComment });
};

// Obtener comentarios por id de película
exports.getCommentsByMovieId = (req, res) => {
    const movieId = parseInt(req.params.id, 10);
    const movieComments = dataComments.filter(comment => comment.movieId === movieId);
    res.json(movieComments);
};
