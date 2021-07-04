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
app.use(bodyParser.json());
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

app.post('/api/cadastro/produtos',(req, res) => {
  const cod_produtos = req.body.id_produtos;
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

  connection.query("INSERT INTO produtosTB (cod_produt, descricao_produt, forn_produt, unidade_produt, local_produt, referencia_produt, fabricante_produt, cod_barras_produt, setor_produt, cod_interno_produt, preco_custo_produt, preco_venda_produt, preco_atacado_produt, preco_promo_produt, margem_lucro_produt, estoque_atual_produt, lucro_venda_produt, lucro_atacado_produt, data_cadastro_produt, foto_produt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
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
    margem_lucro_produt,
    estoque_atual_produt,
    lucro_venda_produt,
    lucro_atacado_produt,
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



app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
});
