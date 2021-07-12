const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 3001
const app = express();
const { connection } = require("./db")
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", 'DELETE'],
    credentials: true,
  })
);

app.get('/', (req, res, next) => {
  res.json({message: "API funcionando!"});
})

app.get("/api/login/:User/:Pass", (req, res) => {
  const User = req.params.User;
  const Pass = req.params.Pass;
  connection.query(`SELECT acesso_pdv, CPF_func, senha_operador_func, tipo_func, id_func FROM funcionariosTB WHERE CPF_func = ${User} && senha_operador_func = ${Pass} && acesso_pdv = 'true'`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//////// GET e POST referente a login 
app.get("/api/acess/users", (req, res) => {

  connection.query(`SELECT * FROM acesso_sistema`,
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.post('/api/cria/acesso/login',(req, res)=>{
  const User = req.body.User;
  const Pass = req.body.Pass;
  const TipoUser = "administrador";
  connection.query(`INSERT INTO acesso_sistema usuario_login=${User}, senha_login=${Pass}, tipo_de_user=${TipoUser}`,
  (err, result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  })
})
///////// Final 


//////// GET e POST referente a Setor 
app.post('/api/setor/create',(req, res)=>{
  const setor = req.body.setor;
  connection.query('INSERT INTO setorTB (setor) VALUES (?)',[setor],
  (err, result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  });
});

app.get("/api/setor", (req, res) => {

  connection.query("SELECT * FROM setorTB", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/api/delete/setor/:idSetor",(req,res) => {
  const idSetor = req.params.idSetor;
  connection.query(`DELETE FROM setorTB WHERE  id_setor=${idSetor}`,(err, result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  })
})

///////// Final 


//////// GET e POST referente a cargo
app.post('/api/cargo/create',(req, res)=>{
  const cargos = req.body.cargos;
  connection.query('INSERT INTO cargoTB ( cargo) VALUES (?)',[cargos],
  (err, result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  });
});

app.get("/api/cargo", (req, res) => {

  connection.query(`SELECT * FROM cargoTB`,
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/api/delete/cargo/:idCargo",(req,res) => {
  const idCargo = req.params.idCargo;
  connection.query(`DELETE FROM cargoTB WHERE id_cargo=${idCargo}`,(err, result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  });
});
///////// Final 


//////// GET e POST referente a Funcionarios
app.post('/api/registro/funcionario',(req, res)=>{

  const cod_func = req.body.cod_func;
  const nome_func = req.body.nome_func;
  const sobrenome_func = req.body.sobrenome_func;
  const nascimento_func = req.body.nascimento_func;
  const data_cadastro = req.body.data_cadastro;
  const CPF_func = req.body.CPF_func;
  const celular_func = req.body.celular_func;
  const salario_func = req.body.salario_func;
  const cargo_func = req.body.cargo_func;
  const dia_pagamento_func = req.body.dia_pagamento_func;
  const data_admissao_func = req.body.data_admissao_func;
  const acesso_pdv = req.body.acesso_pdv;
  const senha_operador_func = req.body.senha_operador_func;
  const tipo_func = req.body.tipo_func;

  connection.query("INSERT INTO funcionariosTB (acesso_pdv, senha_operador_func, tipo_func, cod_func, nome_func, sobrenome_func, nascimento_func, data_cadastro, CPF_func, celular_func, dia_pagamento_func, data_admissao_func, salario_func, cargo_func) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
  [acesso_pdv, senha_operador_func,tipo_func,cod_func,nome_func,sobrenome_func,nascimento_func,data_cadastro,CPF_func,celular_func,dia_pagamento_func,data_admissao_func,salario_func,cargo_func],
  (err, result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result)
    }
  })
  
})
///////// Final 


//////// GET e POST referente a Estoque
app.post('/api/cadastro/produtos',(req, res) => {
  const cod_produt = req.body.cod_produt;
  const descricao_produt = req.body.descricao_produt;
  const forn_produt = req.body.forn_produt;
  const unidade_produt = req.body.unidade_produt;
  const local_produt = req.body.local_produt;
  const referencia_produt = req.body.referencia_produt;
  const fabricante_produt = req.body.fabricante_produt;
  const cod_barras_produt = req.body.cod_barras_produt;
  const setor_produt = req.body.setor_produt;
  const cod_interno_produt = req.body.cod_interno_produt;
  const preco_custo_produt = req.body.preco_custo_produt;
  const preco_venda_produt = req.body.preco_venda_produt;
  const preco_atacado_produt = req.body.preco_atacado_produt;
  const preco_promo_produt = req.body.preco_promo_produt;
  const margem_lucro_produt = req.body.margem_lucro_produt;
  const estoque_atual_produt = req.body.estoque_atual_produt;
  const lucro_venda_produt = req.body.lucro_venda_produt;
  const lucro_atacado_produt = req.body.lucro_atacado_produt;
  const data_cadastro_produt = req.body.data_cadastro_produt;
  const foto_produt = '1';

  connection.query("INSERT INTO produtosTB (cod_produt, descricao_produt, forn_produt, unidade_produt, local_produt, referencia_produt, fabricante_produt, cod_barras_produt, setor_produt, cod_interno_produt, preco_custo_produt, preco_venda_produt, preco_atacado_produt, preco_promo_produt, estoque_atual_produt, data_cadastro_produt, foto_produt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
    cod_produt,
    descricao_produt,
    forn_produt,
    unidade_produt,
    local_produt,
    referencia_produt,
    fabricante_produt,
    cod_barras_produt,
    setor_produt,
    cod_interno_produt,
    preco_custo_produt,
    preco_venda_produt,
    preco_atacado_produt,
    preco_promo_produt,
    estoque_atual_produt,
    data_cadastro_produt,
    foto_produt
  ],  (err, result) => {
    if(err) {
        console.log(err)
    }else {
        res.send(result)
    }
  })
})

app.get("/api/produtos/estoque", (req, res) => {

  connection.query(`SELECT * FROM produtosTB`,
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
///////// Final 


app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
});
