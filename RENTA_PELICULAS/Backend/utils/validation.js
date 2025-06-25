
// validar datos en signup
exports.validateRegistration = (data) => {
    const errors = [];

    if (!data.name || data.name.trim() === '') {
        errors.push({ field: 'name', message: 'El nombre es requerido' });
    }
    if (!data.lastname || data.lastname.trim() === '') {
        errors.push({ field: 'lastname', message: 'El apellido es requerido' });
    }
    if (!data.gender || !['male', 'female', 'other'].includes(data.gender)) {
        errors.push({ field: 'gender', message: 'El género es inválido' });
    }
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
        errors.push({ field: 'email', message: 'El correo electrónico es inválido' });
    }

    // validar requisitos password
    const passwordNeeds = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    /* 
    ^ y $ indican el inicio y fin de la cadena de caracteres
    (?=.*[A-Z]) al menos una mayúscula
    (?=.*\d) al menos un número
    [A-Za-z\d] letras mayúsculas, minúsculas y números
    {8,} al menos 8 caracteres
    */
    if (!data.password || !passwordNeeds.test(data.password)) {
        errors.push({ field: 'password', message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número' });
    }
    if (!data.birthdate || isNaN(Date.parse(data.birthdate))) {
        errors.push({ field: 'birthdate', message: 'La fecha de nacimiento es inválida' });
    }

    return errors;
};

// validar datos en login
exports.validateLogin = (data) => {
    const errors = [];

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
        errors.push({ field: 'email', message: 'El correo electrónico es inválido' });
    }
    if (!data.password || data.password.length < 8 || !/[A-Z]/.test(data.password) || !/\d/.test(data.password)) {
        errors.push({ field: 'password', message: 'La contraseña es inválida' });
    }

    return errors;
};