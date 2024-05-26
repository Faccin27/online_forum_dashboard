const { Router } = require("express");
const router = new Router();

router.get('/produtos', (req, res) => {
  res.status(200).render("index")
})

router.get('/login', (req, res) => {
  res.status(200).render("login");
});


// Importa e utiliza as rotas de produtos
const produtosRoutes = require('./produtos');
router.use('/produtos', produtosRoutes);

module.exports = router;
