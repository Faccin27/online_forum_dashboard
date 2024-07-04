const express = require("express"); // Express é um framework para aplicação web do Node.js
const jwt = require('jsonwebtoken'); // 'jsonwebtoken' é usado para criar e verificar tokens JWT
const cookieParser = require('cookie-parser'); // 'cookie-parser' é um middleware que analisa os cookies anexados ao objeto de solicitação do cliente
const bodyParser = require('body-parser'); // 'body-parser' analisa o corpo das solicitações HTTP recebidas
const { engine } = require('express-handlebars') // 'express-handlebars' é um mecanismo de template para Express
const router = require("./routes/router") // Importando o router


class App {
  constructor() {
    this.server = express();
    this.middleweres();
    this.routes();
  }


  // Função para configurar os middlewares
  middleweres() {
    // Configurando a pasta 'public' como estática para servir arquivos estáticos como CSS, imagens e JavaScript
    this.server.use(express.static('public'))

    // Configurando o body-parser para analisar o corpo das solicitações HTTP
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));

    // Configurando o Handlebars como mecanismo de template
    this.server.engine('handlebars', engine())
    this.server.set('view engine', 'handlebars')
    this.server.set("views", "./src/views")

    // Configurando o cookie-parser para analisar os cookies
    this.server.use(cookieParser());

    // Configurando um middleware para verificar o token JWT
    this.server.use((req, res, next) => {
      res.set('Cache-Control', 'no-store')                // Instrui ao navegador a não armazenar a página em cache
      let token = req.cookies["tokenJWT"];                // Obtendo o token do cookie
      jwt.verify(token, 'chave_secreta', (err, user) => { // Verificando o token
        if (user) req.id = user.id                        // Se o token for válido, o ID do usuário é anexado ao objeto de solicitação
      });
      next()                                              // Chamando a próxima função no pipeline do middleware
    })
  }

  routes() {
    this.server.use(router)
  }
}

module.exports = new App().server;
