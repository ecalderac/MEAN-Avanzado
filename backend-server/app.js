//Requires
const express = require('express');
const mongoose = require('mongoose');

//Inicializar variables
const app = express();


//Conexion a la BD
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'Online');

})

//Rutas
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    })

});


//Escuchar peticiones
app.listen(3000, () => {
    console.log('Escuchando el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});