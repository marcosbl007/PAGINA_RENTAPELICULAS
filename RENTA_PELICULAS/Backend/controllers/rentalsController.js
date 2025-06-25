
// dependencias a utilizar
const { dataRentals, updateRentalsFile } = require('../data/rentals'); // simula la base de datos de alquileres
const { dataMovies, updateMoviesFile }= require('../data/movies'); // simula base de datos de peliculas

// alquilar una pelicula
exports.rentMovie = (req, res) => {
    const { email, movieId } = req.body;

    // verificar si la pelicula ya fue alquilada
    const rented = dataRentals.find(rental => rental.email === email && rental.movieId === movieId && !rental.returned);
    if (rented) {
        return res.status(400).json({ message: 'La película ya fue alquilada' });
    }

    // verificar si la pelicula existe en la lista de peliclas disponibles 
    const movie = dataMovies.find(movie => movie.id === movieId);
    if (!movie) {
        return res.status(404).json({ message: 'Película no encontrada' });
    }

    // marcar pelicula como rentada
    movie.rented = true;

   // js maneja las fechas en UTC entonces pasé el horario UTC a local 
   const rentDate = new Date().toLocaleString(); // obtiene la fecha y hora local 
   // convertir 48 horas a milisegundos
   const dueDate = new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleString(); // 48 horas desde el momento de rentar

    // crear el nuevo alquiler
    const newRental = {
        id: dataRentals.length + 1,
        userEmail: email,
        movieId,
        rentDate,
        dueDate,
        returned: false,
        lateFee: 0
    };
    // agregar el alquiler a la lista de alquileres
    dataRentals.push(newRental);
    updateRentalsFile();
    // mensaje de confirmación
    res.status(201).json({ message: 'Película alquilada exitosamente', rental: newRental });
};

// devolver una pelicula 
exports.returnMovie = (req, res) => {
    const { email, movieId } = req.body;

    // buscar el alquiler
    const rentalIndex = dataRentals.findIndex(rental => rental.userEmail === email && rental.movieId === movieId && !rental.returned);
    if (rentalIndex === -1) {
        return res.status(404).json({ message: 'Alquiler no encontrado' });
    }

    const rental = dataRentals[rentalIndex];

    // js maneja las fechas en UTC entonces pasé el horario UTC a local 
    const returnDate = new Date().toLocaleString(); // obtiene la fecha y hora local 

    // calcular la multa por retraso
    const now = new Date();
    const dueDate = new Date(rental.dueDate);
    const daysLate = Math.ceil((now - dueDate) / (24 * 60 * 60 * 1000)); // ceil redondea hacia arriba

    let lateFee = 0;
    if (daysLate > 0) {
        lateFee = daysLate * 5; // Q5 por cada día de retraso
    }

    // actualizar el alquiler
    rental.returned = true;
    rental.returnDate = returnDate;
    rental.lateFee = lateFee;

    // actualizar la pelicula como disponible de nuevo 
    const movie = dataMovies.find(movie => movie.id === movieId);
    if (movie) {
        movie.rented = false;
        updateMoviesFile();
    }

    updateRentalsFile();
    // mensaje de confirmación
    res.json({ message: 'Película devuelta exitosamente', lateFee, daysLate });
};

// obtener el historial de alquileres de un user
exports.getRentalsHistory = (req, res) => {
    const userEmail = req.params.email;

    // buscar los alquileres del user
    const userRentals = dataRentals.filter(rental => rental.userEmail === userEmail);

    res.json(userRentals);

// Obtener detalles de las películas alquiladas
const rentalsWithMovieDetails = userRentals.map(rental => {
    const movie = dataMovies.find(movie => movie.id === rental.movieId);
    return { ...rental, movieTitle: movie.title, movieImage: movie.image };
});

res.json(rentalsWithMovieDetails);

};