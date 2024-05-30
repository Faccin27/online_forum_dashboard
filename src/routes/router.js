const { Router } = require("express");
const router = new Router();

router.get('/', (req, res) => {
  res.status(200).render("index");
})

router.get('/login', (req, res) => {
  res.status(200).render("login");
});

router.get('/produtos', (req, res) => {
  res.status(200).render("produtos");
});



module.exports = router;
