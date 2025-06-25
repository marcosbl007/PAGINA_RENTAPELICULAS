
// dependiencias a utilizar 
const fs = require('fs');
const path = require('path');

// lista dinámica que simula la base de datos de usuarios 
let dataUsers = [];

// nombre del archivo que me da persistencia de datos 
const filename = path.join(__dirname, 'Users.json');
// verificar que el archivo ya existe 
if(!fs.existsSync(filename)) {
    fs.writeFileSync(filename, JSON.stringify(dataUsers));
} else {
    // si el archivo ya existe, cargar datos 
    const fileData = fs.readFileSync(filename, 'utf8');
    dataUsers = JSON.parse(fileData);
}

// funcion que actualiza el contenido del archivo json
function updateUsersFile() {
    fs.writeFileSync(filename, JSON.stringify(dataUsers));
}

module.exports = {dataUsers, updateUsersFile };