const UsuarioDAO = require('../models/dao/UsuarioDAO');

class LoginController {
  // Login existing user
  async login(req, res) {
    try {
      const { LoginEmail, LoginPassword } = req.body;
      console.log('Dados recebidos:', req.body);

      // Check if the email exists
      const user = await UsuarioDAO.findOne({ email: LoginEmail });
      if (!user) {
        console.log("Login cancelado: email não encontrado");
        return res.status(400).send('Email não encontrado');
      }

      // Check if the password matches
      if (user.senha !== LoginPassword) {
        console.log("Login cancelado: senha incorreta");
        return res.status(400).send('Senha incorreta');
      }

      // Successful login
      console.log("Login bem-sucedido:", user);
      return res.redirect("/produtos");
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return res.send('Erro ao fazer login');
    }
  }
}

module.exports = new LoginController();
