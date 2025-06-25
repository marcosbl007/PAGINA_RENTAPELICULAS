
// dependencias a utilizar
const fs = require('fs');
const path = require('path');

// lista dinámica que simula la base de datos de los comentarios
let dataComments = [];

// nombre del archivo que me da persistencia de datos
const commentsFile = path.join(__dirname, 'Comments.json');
// verificar que el archivo ya existe
if (!fs.existsSync(commentsFile)) {
    fs.writeFileSync(commentsFile, JSON.stringify(dataComments));
} else {
    // si el archivo ya existe, cargar datos
    const fileData = fs.readFileSync(commentsFile, 'utf8');
    dataComments = JSON.parse(fileData);
}

// funcion que actualiza el contenido del archivo json
function updateCommentsFile() {
    fs.writeFileSync(commentsFile, JSON.stringify(dataComments));
}

module.exports = { dataComments, updateCommentsFile };