// Importando os módulos necessários
const { Router } = require("express");
const router = new Router();
const RegisterController = require('../controllers/RegisterController');

// O módulo 'jsonwebtoken' é usado para criar e verificar tokens JWT (JSON Web Tokens)
const jwt = require('jsonwebtoken');
const Usuario = require("../models/Usuario");
const UsuarioDAO = require("../models/dao/UsuarioDAO");

// Variável para armazenar o usuário logado
let usuarioLogado;

// Esta função busca o usuário no banco de dados usando o ID da requisição
async function getUsuarioLogado(req) {
  usuarioLogado = await UsuarioDAO.getById(req.id);
}

router.get('/', (req, res) => {
  res.status(200).redirect("login");
});


router.get('/profile', (req, res) => {
  res.status(200).render("profile")
})

router.get('/produtos', async (req, res) => {
  await getUsuarioLogado(req);
  if (usuarioLogado) {
    res.status(200).render("produtos", {
      usuarioLogado: usuarioLogado.get()
    })
  }
  else {
    res.status(200).render("login", {
    })
  }
})


// Esta rota verifica se o usuário está logado e, em caso afirmativo, renderiza a página protegida
router.get('/produtos', async (req, res) => {
  await getUsuarioLogado(req);
  if (usuarioLogado) {
    res.render('produtos', { usuarioLogado: usuarioLogado.get() });
  } else {
    res.status(403).send("Acesso negado!")
  }
});

router.get('/login', async (req, res) => {
  await getUsuarioLogado(req);
  if (usuarioLogado) {
    res.redirect('/produtos');
  } else {
    res.status(200).render("login", {
    })
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', RegisterController.register);

router.post('/login', async (req, res) => {

  let email = req.body.LoginEmail;
  let senha = req.body.LoginPassword;

  const usuario = await Usuario.findOne({ where: { email: email } });

  if (!usuario || senha !== usuario.senha) {
    return res.status(200).render('login', {
      message: 'Usuário ou senha inválidos'
    });
  }

  const token = jwt.sign({ id: usuario.id }, 'chave_secreta', { expiresIn: '1H' });

  res.cookie("tokenJWT", token);
  return res.redirect(301, '/produtos');
});

// Esta rota limpa o cookie do token JWT e redireciona o usuário para a página inicial
router.get('/deslogar', (req, res) => {
  res.clearCookie('tokenJWT');
  return res.redirect(301, '/');
});

module.exports = router;
