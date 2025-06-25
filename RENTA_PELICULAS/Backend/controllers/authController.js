
// dependencias a utilizar
const { dataUsers, updateUsersFile } = require('../data/users');
const { validateRegistration, validateLogin } = require('../utils/validation');



// credenciales del admin
const adminEmail = 'admin@email.com';
const adminPassword = 'Admin123';

// registro de usuarios 
exports.register = (req, res) => {

    const { name, lastname, gender, email, password, birthdate } = req.body;

    /*
    // Validar datos de registro
    const validationErrors = validateRegistration(req.body);
    if (validationErrors.length > 0) {
        console.log('Errores de validación:', validationErrors);
        return res.status(400).json({error: 'La contraseña no cumple el formato', errors: validationErrors});
    }
    */
   
    try {
    // verificar si el usuario ya existe 
    const userExisting = dataUsers.find(user => user.email === email);
    if (userExisting) {
        return res.status(400).json({error: 'El usuario ya existe'});
    }

    // crear el nuevo usuario
    const newUser = {
        id: dataUsers.length + 1,
        name,
        lastname,
        gender,
        email,
        password, 
        birthdate
    };
    // agregar el usuario a la lista de usuarios
    dataUsers.push(newUser);
    updateUsersFile();
    // mensaje de confirmación
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser })
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


// login de usuarios
exports.login = (req, res) => {
const { email, password} = req.body;

// validar credenciales de admin
if (email === adminEmail && password === adminPassword) {
    return res.status(200).json({ message: 'Inicio de sesión exitoso del Administrador', isAdmin: true });
}

// buscar el usuario y verificar constraseña
const user = dataUsers.find(user => user.email === email);
// verificar que el usuario esté y validando contraseña y correo 
if (!user || user.password !== password ) {
    return res.status(400).json({error: 'Usuario o contraseña incorrectos'});
}
// mensaje de confirmación
res.status(200).json({ message: 'Inicio de sesión exitoso' , userId: user.id});
}