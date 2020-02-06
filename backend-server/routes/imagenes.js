const express = require('express');

const app = express();

const path = require('path');
const fs = require('fs');

app.get('/:tipo/:img', (req, res, next) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    // let pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${img}`);

    // if (fs.existsSync(pathImagen)) {
    //     res.sendFile(pathImagen);
    // } else {
    //     let pathNoImagen = path.resolve(__dirname, '../assets/no-img.jpg');
    //     res.sendFile(pathNoImagen);
    // }

    let path = `./uploads/${ tipo }/${ img }`;

    fs.exists(path, existe => {

        if (!existe) {
            path = './assets/no-img.jpg';
        }


        res.sendfile(path);

    });

});

module.exports = app;