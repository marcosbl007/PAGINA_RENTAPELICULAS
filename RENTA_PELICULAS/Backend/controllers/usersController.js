
// dependencias a utilizar
const { dataUsers, updateUsersFile } = require('../data/users');

// obtener todos los usuarios 
exports.getUsers = (req, res) => {
    res.json(dataUsers);
};

// eliminar un usuario por email 
exports.deleteUsers = (req, res) => {
    // se obtiene el id del usuario
    const email = req.params.email;
    // se busca el índice del usuario en la lista
    const userIndex = dataUsers.findIndex(user => user.email === email);
    // si no se encuentra el usuario
    if(userIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado"});
    } 
    // se elimina el usuario de la lista
    dataUsers.splice(userIndex, 1);
    updateUsersFile();
    return res.json({ message: "Usuario eliminado correctamente"});

};

exports.getUserByEmail = (req, res) => {
    const email = req.params.email;
    const user = dataUsers.find(user => user.email === email);

    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
};


// actualizar la información de un user
exports.updateUsers = (req, res) => {
    const email = req.params.email;
    const updateUser = req.body;

    // buscar el índice del usuario en la lista
    const userIndex = dataUsers.findIndex(user => user.email === email);

    // si no se encuentra el usuario
    if(userIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado"});
    }

    // se actualizan los atributos del usuario
    dataUsers[userIndex] = { ...dataUsers[userIndex], ...updateUser};

    updateUsersFile();
    return res.json({ message: "Datos actualizados correctamente", user: dataUsers[userIndex]});
};