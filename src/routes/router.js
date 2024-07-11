// Importando os módulos necessários
const { Router } = require("express");
const router = new Router();
const RegisterController = require('../controllers/RegisterController');
const PostagemDAO = require('../models/dao/PostagemDAO');

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



//postar
router.post('/produtos/create', async (req, res) => {
  await getUsuarioLogado(req);

  if (usuarioLogado) {
    
    const { titulo, conteudo } = req.body;
    console.log('Request body:', req.body);
    console.log('Titulo:', titulo);
    console.log('Conteudo:', conteudo);
    
    try {
      const newPostagem = await PostagemDAO.create({
        idUsuario: usuarioLogado.id,
        titulo: titulo,
        conteudo: conteudo,
        dataHora: new Date()
      });
      
      res.status(201).redirect('/produtos');

    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar postagem' });
    }
  } else {
    res.redirect('/login');
  }
});




router.get('/produtos', async (req, res) => {
  await getUsuarioLogado(req);

  const idPost = req.query.post;
  let listaPosts = await PostagemDAO.getAll();
  if (listaPosts) listaPosts = listaPosts.map(post => post.get());

  let postagemUnica = PostagemDAO.getById(idPost);
  
  
  if (usuarioLogado) {
    res.status(200).render("produtos", {
      usuarioLogado: usuarioLogado.get(),
      listaPosts: listaPosts,
      postagemUnica: postagemUnica
    })
  }
  else {
    res.status(200).render("login", {
    })
  }
});






router.get('/profile', async (req, res) => {
  await getUsuarioLogado(req);
  if (usuarioLogado) {
    res.render('profile', { usuarioLogado: usuarioLogado.get() });
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