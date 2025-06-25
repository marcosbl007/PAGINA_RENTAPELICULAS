
// dependiencias a utilizar 
const fs = require('fs');
const path = require('path');

// lista dinámica que simula la base de datos de las películas alquiladas
let dataRentals = [];

// nombre del archivo que me da persistencia de datos
const rentalsFile = path.join(__dirname, 'Rentals.json');
// verificar que el archivo ya existe
if (!fs.existsSync(rentalsFile)) {
    fs.writeFileSync(rentalsFile, JSON.stringify(dataRentals));
} else {
    // si el archivo ya existe, cargar datos
    const fileData = fs.readFileSync(rentalsFile, 'utf8');
    dataRentals = JSON.parse(fileData);
}

// funcion que actualiza el contenido del archivo jsonA
function updateRentalsFile() {
    fs.writeFileSync(rentalsFile, JSON.stringify(dataRentals));
}

module.exports = { dataRentals, updateRentalsFile };