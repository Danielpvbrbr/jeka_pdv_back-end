const Router = require('router');
const router = Router();
const { connection } = require("../db");
const login = require('./login');
const setor = require('./setor');
const cargo = require('./cargo');
const funcionario = require('./funcionario');
const produto = require('./produto');

router.get('/', (req, res, next) => {
  res.status(200).send({
    message: "API funcionando!"
  });
});

router.get('/auth/login', (req, res, next) => {
  res.status(200).send({
    message: "Login realizado com suceesso!"
  });
});

router.get('/api/acess/users', login);
router.post('/api/login/:User/:Pass', login);
router.post('/api/cria/acesso/login', login);


router.post('/api/setor/create', setor);
router.get('/api/setor', setor);
router.delete('/api/delete/setor/:idSetor', setor);


router.post('/api/cargo/create', cargo);
router.get('/api/cargo', cargo);
router.delete('/api/delete/cargo/:idCargo', cargo);


router.post('/api/delete/cargo/:idCargo', funcionario);


router.post('/api/cadastro/produtos', produto);
router.get('/api/produtos/estoque', produto);
router.get('/api/produtos/:id', produto);
router.delete('/api/produtos/estoque/:id', produto);

module.exports = router;