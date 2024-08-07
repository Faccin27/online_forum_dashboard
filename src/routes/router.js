// Importando os módulos necessários
const { Router } = require("express");
const router = new Router();
const RegisterController = require('../controllers/RegisterController');
const PostagemDAO = require('../models/dao/PostagemDAO');
const CurtidaDAO = require("../models/dao/CurtidaDAO");
const Curtida = require("../models/Curtida");

const jwt = require('jsonwebtoken');
const Usuario = require("../models/Usuario");
const UsuarioDAO = require("../models/dao/UsuarioDAO");
const RespostaDAO = require("../models/dao/RespostaDAO");
const Resposta = require("../models/Resposta");

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
    const { titulo, conteudo, dataHora } = req.body;
    try {
      const newPostagem = await PostagemDAO.create({
        idUsuario: usuarioLogado.id, titulo, conteudo, dataHora
      });
      res.status(201).redirect("/produtos");

    } catch (error) {
      res.status(500).json({ error: 'erro ao criar postagem' })
    }
  } else {
    res.redirect('/login');
  }
});

router.post("/produtos/curtida/:id", async (req, res) => {
  let variabels = req.query.batata;


  await getUsuarioLogado(req);

  if (usuarioLogado) {


    let idPostagem = req.params.id;

    let curtida = await Curtida.findOne({ where: { idPostagem: idPostagem, idUsuario: usuarioLogado.id } })

    if (curtida) {
      CurtidaDAO.delete(curtida.id)
    } else {
      CurtidaDAO.create({ idUsuario: usuarioLogado.id, idPostagem: idPostagem })
    }

    if(variabels){
      res.redirect("/produtos/?post="+ idPostagem);
    } else{

    
    res.redirect("/produtos");}
  } else {
    res.redirect("/login")
  }
});





router.get('/produtos', async (req, res) => {
  await getUsuarioLogado(req);

  if (usuarioLogado) {
    let listaPosts = await PostagemDAO.getAll();
    let idPost = req.query.post;
    let post;

    for (let i = 0; i < listaPosts.length; i++) {
      let curtidasPost = await Curtida.findAll({ where: { idPostagem: listaPosts[i].id } });
      let ctdCurtidasPost = curtidasPost.length;
      listaPosts[i].curtidas = ctdCurtidasPost;
      listaPosts[i].dataHora = listaPosts[i].dataHora.toLocaleString('pt-BR', { timezone: 'UTC' });
      console.log("clebimson",listaPosts[i].dataHora);
      listaPosts[i].curtido = await Curtida.findOne({ where: { idPostagem: listaPosts[i].id, idUsuario: usuarioLogado.id } })
    }



    if (idPost) {

      post = await PostagemDAO.getById(idPost);
      if (post) {

        
        post = post.get();
        post.autor = await (await UsuarioDAO.getById(post.idUsuario)).get().nome
        post.dataHora = post.dataHora.toLocaleString('pt-BR', { timezone: 'UTC' });
        console.log("post datas",post.dataHora);
        post.curtido = await Curtida.findOne({ where: { idPostagem: post.id, idUsuario: usuarioLogado.id } })
        let curtidasdopost = await Curtida.findAll({ where: { idPostagem: post.id } });
        post.curtidas = curtidasdopost.length;



        let comentarios = await (RespostaDAO.getRespostaByPostagem(post))
        for (let i = 0; i < comentarios.length; i++) {
          comentarios[i] = comentarios[i].get()
          let comentador = await UsuarioDAO.getById(comentarios[i].idUsuario)
          comentarios[i].autor = comentador.get().nome
          comentarios[i].dataHora = comentarios[i].dataHora.toLocaleString('pt-BR', { timezone: 'UTC' });
        }

        post.comentarios = comentarios;

      } else {
        res.status(404).send('Postagem Inexistente');
      }
    } else {
      console.log("n pegou post");
    }

    if (usuarioLogado) {
      res.status(200).render("produtos", {
        usuarioLogado: usuarioLogado.get(),
        listaPosts: listaPosts,
        post: post
      })
    }
    else {
      res.status(200).render("login", {
      })
    }
  }
});

//postar comentario
router.post("/produtos/comentar/:id", async (req, res) => {
  await getUsuarioLogado(req);
  if (usuarioLogado) {
    console.log("Usuario: ",usuarioLogado);
    let idPostagem = req.params.id;
    console.log("parametro", idPostagem);
    let conteudo = req.body.conteudo;
    console.log("conteudo: ",conteudo)

    let resposta = await RespostaDAO.create({
      idUsuario: usuarioLogado.id,
      idPostagem: idPostagem,
      conteudo: conteudo,
      dataHora: new Date()
    });

    console.log("TESTE DE RESPOSTA",resposta);

    res.status(201).redirect(req.get('Referer'));

  } else {
    res.redirect("/login");
  }
});


router.delete('/produtos/:id', async (req, res) => {
  await getUsuarioLogado(req);

  if (usuarioLogado) {
    const postagemId = req.params.id;
    try {
      const result = await PostagemDAO.delete(postagemId);
      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar postagem' });
    }
  } else {
    res.status(403).json({ error: 'Usuário não autenticado' });
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