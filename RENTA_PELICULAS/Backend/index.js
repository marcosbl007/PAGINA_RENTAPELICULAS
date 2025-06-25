// Dependencias utilizadas
const express = require('express'); // requiere de la dependencia express
const bodyParser = require('body-parser'); // requiere de la dependencia body parser
const cors = require('cors'); // requiere de la dependencia cors

// Rutas 
const authRoutes = require('./routes/authRoutes')
const usersRoutes = require('./routes/usersRoutes');
const moviesRoutes = require('./routes/moviesRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const rentalRoutes = require('./routes/rentalsRoutes');
const dataUsers = require('./data/users');

// Se crea el backend usando el framework de express
const app = express();
// Se especifica el puerto en que se abra el servidor o backend 
const PORT = 5000;

// Se especifica al framework que se usara el body parser y los cors
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', // Cambia esto a la URL de tu frontend
    credentials: true
}));

// Rutas
app.use('/api/auth', authRoutes);     // ppara rutas relacionadas con la autenticación
app.use('/api/users', usersRoutes);   // para rutas relacionadas con los usuarios
app.use('/api/movies', moviesRoutes); // para rutas relacionadas con las películas
app.use('/api/comments', commentsRoutes); // para rutas relacionadas con los comentarios
app.use('/api/rentals', rentalRoutes); // para rutas relacionadas con los alquileres 

// Se especifica el puerto en que se abra el servidor o backend
app.listen(PORT, ()=> {
    console.log(`Server is running on port: ${PORT}`);
});
