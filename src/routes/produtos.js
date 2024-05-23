const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/ProdutosController');

// Rota para listar todos os produtos (READ)
router.get('/', produtosController.list);

// Rota para mostrar um produto (READ)
router.get('/:id', produtosController.show);

module.exports = router;
