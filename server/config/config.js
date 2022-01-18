//==============================================
//   PUERTO
//==============================================

process.env.PORT = process.env.PORT  || 3000;

//==========================================
//  BASE DE DATOS
//==========================================
  
let urlDB;

if( process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://jccabrera:julio1989@cluster0.wutyi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}


process.env.URLDB = urlDB;