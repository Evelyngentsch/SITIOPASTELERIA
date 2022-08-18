var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel');

/* GET home page. */
router.get('/',  async function (req, res, next) {

  var novedades = await novedadesModel.getNovedades();

  res.render('index',{
    novedades
  });
});

router.post('/', async (req, res, next) => {

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;
  //console.log(req.body)

  var obj = {
    to: 'eve.gentsch@gmail.com',
    subject: 'CONTACTO WEB',
    html: nombre + " " + apellido + " se contacto a travez de la web y quiere mas información a este correo : " + email + ". <br> Además, hizo este comentario : " + mensaje + ". <br> Su teléfono es : " + telefono
  } //cierra obj

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS

    }
  }) //cierra transporter


  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente'
  });

}); //cierra peticion del post


module.exports = router;
