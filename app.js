const express = require('express');
const app = express();
const moment = require('moment');
const voca = require('voca');

app.get('/', function(req, res) {
    res.send('Hola, bienvenido al Heading to Codefest');
});

app.get('/saludo', function(req, res) {
    let nombre = req.query.nombre;

    if(nombre) {
        res.send(`Hola ${nombre}, bienvenido al Heading to Codefest`);
    }
    else{
        res.send(`Hola, bienvenido al Heading to Codefest`);
    }
});

app.get('/numdias', function(req, res) {
    if(req.query.fecha && req.query.fecha.length <= 10) {
        const regExFecha = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g;

        if(req.query.fecha.match(regExFecha)) {
            const fechaIntroducida = moment(req.query.fecha);
            const fechaActual = moment();
            const dias = fechaIntroducida.diff(fechaActual, 'days');
            if(dias < 0) {
                res.send(`Han transcurrido ${-dias} días desde la fecha introducida`);
            }
            else {
                res.send(`Faltan ${dias} días para la fecha introducida`);
            }
        }
        else {
            res.send('Debes introducir la fecha con el formato yyyy-mm-dd');
        }
    }
    else{
        res.send('Debes introducir la fecha con el formato yyyy-mm-dd');
    }

});

//Poner la palabra al reves
app.get('/reverse-word', function(req, res) {

    const palabra = req.query.palabra;

    if(req.query.palabra && req.query.palabra.length > 0){
        res.send(voca.reverse(palabra));
    }else{
        res.send('Error, la palabra no ha sido introducida');
    }
});

//Comprobar si esta en minuscula
app.get('/is-lower-case', function(req, res) {

    const palabra = req.query.palabra;

    if(palabra) {
        let esMinuscula = voca.isLowerCase(palabra);
        res.send(`${palabra} ${esMinuscula ? 'esta en minuscula' : 'no esta en minuscula}`);
    }else{
        res.send('Error, la palabra no esta en minuscula');
    }
})

app.listen(3000, function() {
    console.log('taller NodeJS app listening on port 3000');
});