const { Router } = require("express");
const router = new Router();
const RegisterController = require('../controllers/RegisterController');
const LoginController = require('../controllers/LoginController');

router.get('/', (req, res) => {
  res.status(200).redirect("login");
});

router.get('/login', (req, res) => {
  res.status(200).render("login");
});

router.get('/produtos', (req, res) => {
  res.status(200).render("produtos");
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', RegisterController.register);
router.post('/login', LoginController.login); // Add this line

module.exports = router;
