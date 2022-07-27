var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

router.get("/",function(req,res,next){
    res.render("contacto",{
        iscontacto: true
    });
})

router.post("/",async function(req,res,next){
    // console.log(req.body)

    var nombre = req.body.nombre;
    var email = req.body.email;
    var telefono = req.body.telefono;
    var comentarios = req.body.comentarios;
    // console.log(req.body.nombre)

    var obj = {
        to:"ignaciorusso0912@gmail.com",
        subject:"contacto desde la pagina web",
        html: nombre + " se contacto a traves de la web y quiere obtener mas informacion a este correo: " + email + "<br> su telefono es: " + telefono + ". su comentario es: " + comentarios + "."
    }

    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS 
        }

    })

    var informacion = await transport.sendMail(obj);

    res.render("contacto" ,{
        message: "Mensaje enviado correctamente", iscontacto: true
    })

})




module.exports = router;