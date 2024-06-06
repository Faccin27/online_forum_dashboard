const UsuarioDAO = require('../models/dao/UsuarioDAO');

class RegisterController {
  // Registrar novo usuário (Register)
  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;

      // Cria um novo usuário
      const newUser = await UsuarioDAO.create({ nome, email, senha });

      // Retorna uma resposta de sucesso
      console.log(newUser);
      return res.redirect("/produtos")
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return res.send('Erro ao registrar usuário');
    }
  }
}

module.exports = new RegisterController();
