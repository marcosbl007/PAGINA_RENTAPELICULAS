
// dependencias a utilizar 
const fs = require('fs');
const path = require('path');

// lista dinámica que simula la base de datos de las películas 
let dataMovies = [];

// nombre del archivo que me da persistencia de datos 
const moviesFile = path.join(__dirname, 'Movies.json');
// verificar que el archivo ya existe 
if(!fs.existsSync(moviesFile)) {
    fs.writeFileSync(moviesFile, JSON.stringify(dataMovies));
} else {
    // si el archivo ya existe, cargar datos 
    const fileData = fs.readFileSync(moviesFile, 'utf8');
    dataMovies = JSON.parse(fileData);
}

// funcion que actualiza el contenido del archivo json
function updateMoviesFile() {
    fs.writeFileSync(moviesFile, JSON.stringify(dataMovies));
}

module.exports = { dataMovies, updateMoviesFile };