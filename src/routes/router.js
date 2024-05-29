const { Router } = require("express");
const router = new Router();

router.get('/', (req, res) => {
  res.status(200).render("index");
})

router.get('/login', (req, res) => {
  res.status(200).render("login");
});



module.exports = router;
