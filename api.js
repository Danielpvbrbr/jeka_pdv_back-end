const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "bancodb",
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get('/', (req, res, next) => {
  res.json({message: "API funcionando!"});
})

app.get("/api/list", (req, res) => {
  connection.query("SELECT * FROM dblista", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/cadastrar", (req, res) => {
    var messagem = "Registro inserido com sucesso";
    var username = req.body.username;
    var email = req.body.email;
    var senha = req.body.senha;

    connection.query(
        'INSERT INTO `dblista`( `nome`, `email`, `senha`) VALUES ("' + username + '","' + email + '","' + senha + '")', (err, result) => {
            if (err) {
                console.log(err);
                messagem = "Erro ao atualizar o registro"
            } else {
                console.log(result);
            }
        });


    res.send(messagem);
});

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
});
