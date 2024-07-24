const UsuarioDAO = require('../models/dao/UsuarioDAO');

class RegisterController {
  // Registrar novo usuário (Register)
  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;
      console.log('Dados recebidos:', req.body);

      // Verifica se o nome já está em uso
      const existname = await UsuarioDAO.findOne({ where: { nome } });
      if (existname) {
        console.log("Cancelado pois nome duplicado");
        req.flash('errorMessage', 'Nome já está em uso');
        return res.redirect('/register');
      }

      const existEmail = await UsuarioDAO.findOne({ where: { email } });
      if (existEmail) {
        console.log("Cancelado pois email duplicado");
        req.flash('errorMessage', 'Email já está em uso');
        return res.redirect('/register');
      }

      // Cria um novo usuário
      const newUser = await UsuarioDAO.create({ nome, email, senha });

      // Adiciona uma mensagem flash de sucesso
      req.flash('successMessage', 'Usuário registrado com sucesso!');

      // Retorna uma resposta de sucesso
      console.log(newUser);
      return res.redirect('/login');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      req.flash('errorMessage', 'Erro ao registrar usuário');
      return res.redirect('/register');
    }
  }
}

module.exports = new RegisterController();
