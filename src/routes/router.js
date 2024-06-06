const { Router } = require("express");
const router = new Router();

router.get('/', (req, res) => {
  res.status(200).redirect("login")
})

router.get('/login', (req, res) => {
  res.status(200).render("login");
});

router.get('/produtos', (req, res) => {
  res.status(200).render("produtos");
});
router.get('/register', (req, res) => {
  res.status(200).render("register");
});



module.exports = router;
