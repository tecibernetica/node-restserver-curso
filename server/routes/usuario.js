const express = require('express');

const bcrypt =  require('bcrypt');
const _ = require('underscore');

const Usuario =  require('../models/usuario');
const usuario = require('../models/usuario');



const app = express();



app.get('/usuario',  (req, res) => {
  //para paginar la sentencia sse pone limit y para ver los proximos se pone la cantidad  

   let desde = req.query.desde || 0;
   desde = Number(desde);

   let limite = req.query.limite || 0;
   limite = Number(limite);

  console.log('LImitessssssssssssss')  
  console.log(limite)


  Usuario.find({estado:true}, 'nombre email role estado google img')
          .skip(desde)
          .limit(limite)
          .exec( (err,usuarios) =>{

            if (err) {
              console.log(err)
              return res.status(400).json({
                  ok:false,
                  err
              }); 
          }

          //Contar Registros
          Usuario.count({estado:true},(err, conteo)=>{

            res.json({
              ok:true,
              usuarios,
              cuantos:conteo
            });

          })

          

          });


  });

  
app.post('/usuario',  (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10) ,
        role: body.role
    });

    usuario.save( (err, usuarioDB)=>{
        console.log(usuarioDB)
        if (err) {
            console.log(err)
            return res.status(400).json({
                ok:false,
                err
            }); 
         
        }

        res.json({
            ok:true,
            usuario:usuarioDB
        });
        
         
    });
     
});
  
app.put('/usuario/:id',  (req, res) => {
  
  let id = req.params.id;
  let body = _.pick(req.body,['nombre','email','role','estado']);

  Usuario.findByIdAndUpdate(id, body, {new:true, runValidators: true}, (err, usuarioDB) => {
    if (err) {
      console.log(err)
      return res.status(400).json({
          ok:false,
          err
      }); 
   
  }

  res.json({
      ok:true,
      usuario:usuarioDB
  });

  });


  /*
  Usuario.findById(id, (err, usuarioDB) => {


  });*/

  

  
});

app.delete('/usuario/:id', function (req, res) {
     
  let id = req.params.id;

  let cambiaEstado = {
    estado:false
  }

  //Usuario.findByIdAndRemove(id, (err,usuarioBorrado) =>{
  Usuario.findByIdAndUpdate(id,cambiaEstado, {new:true}, (err,usuarioBorrado) =>{



    if (err) {
      console.log(err)
      return res.status(400).json({
          ok:false,
          err
      }); 
   
    };

    if(!usuarioBorrado){
        return res.status(400).json({
            ok:false,
            err:{
              message: 'Usuario no encontrado'
            }
        }); 
     
      };
  

  res.json({
    ok:true,
    usuario:usuarioBorrado
  });





  })

  });
  

module.exports = app;   