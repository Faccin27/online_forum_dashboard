const Produto = require("../models/produto")
const ProdutosDAO = require('../models/dao/ProdutosDAO');

class ProdutosController {
  // Exibe o formulário de criação de produto
  formCreate(req, res) {
    res.status(200).render("produtosCreate")
  }

  // Cria um novo produto (CREATE)
  create(req, res) {
    let nome = req.body.nome;
    let preco = req.body.preco;
    // Inserir as outras propriedades de produto aqui

    let produto = new Produto(nome, preco);
    ProdutosDAO.criar(produto);
    res.status(201).redirect("/produtos")
  }

  // Lista todos os produtos (READ)
  list(req, res) {
    res.status(200).render("produtosList", {
      produtos: ProdutosDAO.listar(),
      produtosSize: ProdutosDAO.listar().length
    })
  }

  // Mostrar um produto (READ)
  show(req, res) {
    let id = parseInt(req.params.id);
    let produto = ProdutosDAO.buscarPorId(id);
    if (produto) {
      res.render('produtoShow', { produto: produto });
    } else {
      res.status(404).send('Produto não encontrado');
    }
  }

  // Exibir o formulário de edição de produto
  formEdit(req, res) {
    let id = parseInt(req.params.id);
    let produto = ProdutosDAO.buscarPorId(id);
    if (produto) {
      res.render('produtoEdit', { produto: produto });
    } else {
      res.status(404).send('Produto não encontrado');
    }
  }

  // Atualizar um produto (UPDATE)
  update(req, res) {
    let id = parseInt(req.params.id);
    let produto = ProdutosDAO.buscarPorId(id);
    if (produto) {
      produto.nome = req.body.nome
      produto.preco = req.body.preco

      ProdutosDAO.atualizar(id, produto)
      // Faz o response para o browser
      res.status(201).redirect("/produtos");
    }
    else {
      // Faz o response para o browser
      res.status(404).send('Produto não encontrado');
    }
  }

  // Deleta um produto (DELETE)
  delete(req, res) {
    let id = parseInt(req.params.id);

    if (ProdutosDAO.exist(id)) {
      ProdutosDAO.deletar(id)
      res.status(201).redirect("/produtos")
    } else {
      res.status(404).send('Produto não encontrado');
    }
  }
}

module.exports = new ProdutosController();
