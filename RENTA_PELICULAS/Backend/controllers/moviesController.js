// dependencias a utilizar 
const { dataMovies, updateMoviesFile }= require('../data/movies'); // simula base de datos de peliculas
const { dataRentals, updateRentalsFile } = require('../data/rentals'); // simula base de datos de las rentadas
const { dataUsers, updateUsersFile } = require('../data/users'); // simula la base de datos de usuarios
const {dataComments, updateCommentsFile } = require('../data/comments');// simula base de datos de comentarios

// agregar una película 
exports.addMovies = (req, res) => {
    const { title, synopsis, price, director, year, duration, genre, image } = req.body;

    // crear la nueva película
    const newMovie = {
        id: dataMovies.length + 1,
        title,
        synopsis,
        price,
        director,
        year,
        duration,
        genre,
        image
    };
    // agregar la película a la lista de películas
    dataMovies.push(newMovie);
    updateMoviesFile();
    // mensaje de confirmación
    res.status(201).json({ message: 'Película agregada exitosamente', movie: newMovie });
};

// obtener todas las películas
exports.getMovies = (req, res) => {
    // para cada pelicula, se añaden los comentarios asociados
    const moviesCommented = dataMovies.map(movie => {
        const comments = dataComments.filter(comment => comment.movieId === movie.id);
        return { ...movie, comments: comments };
    });
    res.json(moviesCommented);
};


// obtener detalles de una película por ID
exports.getMovieById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const movie = dataMovies.find(movie => movie.id === id);
    if (!movie) {
        return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json(movie);
};

// actualizar una pelicula por id
exports.updateMovies = (req, res) => {
    // se obtiene el id de la película
    const id = parseInt(req.params.id, 10);
    // se obtiene el cuerpo de la petición
    const updateMovie = req.body;
    // se busca el índice de la película en la lista
    const movieIndex = dataMovies.findIndex(movie => movie.id === id);
    // si no se encuentra la película
    if (movieIndex === -1) {
        res.status(404).send({ response: "Película no encontrada" });
    } else {
        // se actualizan los atributos de la película
        dataMovies[movieIndex] = { ...dataMovies[movieIndex], ...updateMovie};
        
        updateMoviesFile();
        res.json({ message: "Película actualizada correctamente" });
    }
};

// eliminar una pelicula por id 
exports.deleteMovies = (req, res) => {
    // se obtiene el id de la película
    const id = parseInt(req.params.id, 10);
    // se busca el índice de la película en la lista
    const movieIndex = dataMovies.findIndex(movie => movie.id === id);
    // si no se encuentra la película
    if (movieIndex === -1) {
        res.status(404).send({ message: "Película no encontrada" });
    } else {
        // se elimina la película de la lista
        dataMovies.splice(movieIndex, 1);
        updateMoviesFile();
        res.json({ message: "Película eliminada correctamente" });
    }
};

// obtener peliculas disponibles 
exports.getAvailableMovies = (req, res) => {
    const userEmail = req.params.email;
    // buscar el usuario con su correo 
    const user = dataUsers.find(user => user.email === userEmail);
    // si no se encuentra el usuario
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // id´s de las peliculas rentadas por el usuario y aun no devueltas
    const rentedMoviesId = dataRentals.filter(rental => rental.userEmail === userEmail && !rental.returned).map(rental=> rental.movieId.toString());
    //DEBUG 
    console.log('Rentas del usuario:', rentedMoviesId); // Verificar qué IDs de películas están siendo rentadas

    // se obtienen las peliculas disponibles
    const availableMovies = dataMovies.filter(movie => !movie.rented);
    //DEBUG
    console.log('Películas disponibles:', availableMovies); // Verificar qué películas se consideran disponibles
    
    res.json(availableMovies);
};