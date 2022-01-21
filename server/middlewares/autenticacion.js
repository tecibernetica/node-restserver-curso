const jwt = require('jsonwebtoken');


//======================================
// Vrificar Token
//======================================

let verificaToken = ( req,res,next ) => {

let token = req.get('token');

   jwt.verify(token,process.env.SEED,(err,decoded)=>{
    if (err) {
        console.log(err)
        return res.status(401).json({
            ok:false,
            err:{
                message: 'Token no valido'
            }
        }); 
    }

    req.usuario = decoded.usuario;
    next();

  });
 
};

//======================================
// Vrificar AdminRole
//======================================

let verificaAdminRole = ( req,res,next ) => {

    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    }else{
      return  res.json({
            ok:false,
            err:{
                messsage:'El usuario no es adminstrador'
            }
        });
    }
};




module.exports = {
    verificaToken,
    verificaAdminRole
}