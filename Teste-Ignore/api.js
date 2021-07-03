const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/teste", {
    useMongoClient:true
}).then(() =>{
    console.log("Servidor mongodb Conectado.")
}).catch((err) =>{
    console.log(`Ops ocorreu um erro durante a conexão: ${err}`)
}) 
// Model - Usuários
// Definindo o model
const UsuarioSchema = mongoose.Schema({

    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require:true
    }, 
    idade: {
        type:Number,
        require:true
    },
    pais: {
        type: String,
    }
})
// Collection

mongoose.model('usuarios', UsuarioSchema )

const Victor = mongoose.model('usuarios')

new Victor({
    nome: "Amanda",
    sobrenome: "Rodrigues",
    email: "email@gmail.com",
    idade: 19,
    pais: "Brasil"
}).save().then(()=>{
        console.log("Usuario criado com sucesso")
     }).catch((err)=>{
        console.log(`Houve um erro ao registrar o usuário: ${err}`)
     })
