const express = require("express");
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars')
const router = require("./routes/router")

class App {
  constructor() {
    this.server = express();
    this.middleweres();
    this.routes();
  }

  middleweres() {
    // Deixando uma pasta pública para usar CSS, imagens estáticas e Javascript
    this.server.use(express.static('public'))

    // Configura o body-parser
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));

    // Configurando o Handlebars como mecanismo de template
    this.server.engine('handlebars', engine())
    this.server.set('view engine', 'handlebars')
    this.server.set("views", "./src/views")
  }

  routes() {
    this.server.use(router)
  }
}

module.exports = new App().server;
