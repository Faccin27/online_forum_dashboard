const express = require("express"); // Express é um framework para aplicação web do Node.js
const jwt = require('jsonwebtoken'); // 'jsonwebtoken' é usado para criar e verificar tokens JWT
const cookieParser = require('cookie-parser'); // 'cookie-parser' é um middleware que analisa os cookies anexados ao objeto de solicitação do cliente
const bodyParser = require('body-parser'); // 'body-parser' analisa o corpo das solicitações HTTP recebidas
const { engine } = require('express-handlebars'); // 'express-handlebars' é um mecanismo de template para Express
const router = require("./routes/router"); // Importando o router
const flash = require('connect-flash'); // Para mensagens e notificações.
const session = require('express-session'); // 'express-session' é necessário para 'connect-flash'

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  // Função para configurar os middlewares
  middlewares() {
    // Configurando a pasta 'public' como estática para servir arquivos estáticos como CSS, imagens e JavaScript
    this.server.use(express.static('public'));

    // Configurando o body-parser para analisar o corpo das solicitações HTTP
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));

    // Configurando o cookie-parser para analisar os cookies
    this.server.use(cookieParser());

    // Configurando o Handlebars como mecanismo de template
    this.server.engine('handlebars', engine());
    this.server.set('view engine', 'handlebars');
    this.server.set("views", "./src/views");

    // Configurando o express-session para suportar sessões
    this.server.use(session({
      secret: 'sua_chave_secreta', // Substitua por uma chave secreta forte
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false } // Defina como true se estiver usando HTTPS
    }));

    // Configurando o connect-flash para mensagens flash
    this.server.use(flash());

    // Middleware para passar mensagens flash para todas as views
    this.server.use((req, res, next) => {
      res.locals.successMessage = req.flash('successMessage');
      res.locals.errorMessage = req.flash('errorMessage');
      next();
    });

    // Configurando um middleware para verificar o token JWT
    this.server.use((req, res, next) => {
      res.set('Cache-Control', 'no-store'); // Instrui ao navegador a não armazenar a página em cache
      let token = req.cookies["tokenJWT"]; // Obtendo o token do cookie
      jwt.verify(token, 'chave_secreta', (err, user) => {
        if (user) req.id = user.id; // Se o token for válido, o ID do usuário é anexado ao objeto de solicitação
      });
      next(); // Chamando a próxima função no pipeline do middleware
    });
  }

  // Função para configurar as rotas
  routes() {
    this.server.use(router);
  }
}

module.exports = new App().server;
