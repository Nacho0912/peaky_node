var express = require('express');
var router = express.Router();
var usuariosModel = require("../../models/usuariosModel")
var novedadesModel = require ("../../models/novedadesModel");

router.get("/", async function(req,res,next){
    var novedades = await novedadesModel.getNovedades();

    res.render("admin/novedades",{
        layout:"admin/layout" , persona:req.session.nombre, novedades
    });
})

router.get("/agregar",(req,res,next) => {
    res.render("admin/agregar",{
        layout: "admin/layout"
    })
})

router.post("/agregar", async (req,res,next) =>{
try{
    if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo  != ""){
        await novedadesModel.insertNovedades(req.body)
        res.redirect("/admin/novedades")
    } else{
        res.render("admin/agregar",{
            layout: "admin/layout",
            error:true,
            message: "completa todos los campos antes de avanzar."
        })
    }

}catch(error){
    console.log(error);
    res.render("admin/agregar",{
        layout:"admin/layout",
        error:true,
        message: "no se cargo la novedad"
        })
    }
})

    router.get("/eliminar/:id", async (req,res,next)=>{
        //console.log(req.params.id);
        var id = req.params.id;
        await novedadesModel.deleteNovedadByID(id)
        res.redirect("/admin/novedades")
    })

module.exports = router;