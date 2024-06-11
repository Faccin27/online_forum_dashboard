const UsuarioDAO = require('../models/dao/UsuarioDAO');

class RegisterController {
  // Registrar novo usuário (Register)
  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;
      console.log('Dados recebidos:', req.body);
      // Verifica se o nome já está em uso
      const existname = await UsuarioDAO.findOne({ nome });
 

      if (existname) {
        console.log("cancelado pois dado duplicado")
        return res.status(400).send('Nome já está em uso');
      }

      const existEmail = await UsuarioDAO.findOne({ email });
      if (existEmail) {
        console.log("cancelado pois email duplicado")
        return res.status(400).send('Email já está em uso');
      }

      // Cria um novo usuário
      const newUser = await UsuarioDAO.create({ nome, email, senha });

      // Retorna uma resposta de sucesso
      console.log(newUser);
      return res.redirect("/produtos");
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return res.send('Erro ao registrar usuário');
    }
  }
}

module.exports = new RegisterController();
