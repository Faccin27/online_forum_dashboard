const User = require('../Usuario'); // Importe o modelo do usuário

class UsuarioDAO {
  // Cria e persiste um usuario
  async create({ nome, email, senha }) {
    let newUser;
    try {
      newUser = await User.create({ nome, email, senha })
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    } finally {
      return newUser; // Retorne o usuário criado
    }
  }

  // Busca todos os usuários do banco de dados
  async getAll() {
    let users;
    try {
      users = await User.findAll();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      return users;
    }
  }

  // Busca um usuário no banco de dados pela sua ID
  async getById(userId) {
    let user;
    try {
      user = await User.findByPk(userId);
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
    } finally {
      return user;
    }
  }

  // Atualiza um usuário no banco de dados
  async update(userId, usuarioAtualizado) {
    let user;
    try {
      user = await User.findByPk(userId);
      if (user) {
        user.nome = usuarioAtualizado.nome || user.nome; // Atualiza o campo de nome se ele foi alterado
        user.email = usuarioAtualizado.email || user.email; // Atualiza o campo de email se ele foi alterado
        user.senha = usuarioAtualizado.senha || user.senha; // Atualiza o campo de senha se ele foi alterado
        await user.save(); // Salve as alterações
      } else {
        console.log('Usuário não encontrado para atualização.');
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    } finally {
      return user;
    }
  }

  // Exclui um usuário do banco de dados
  async delete(userId) {
    let deletado = false
    try {
      const user = await User.findByPk(userId);
      if (user) {
        await user.destroy()
        deletado = true;
      } else {
        console.error('Usuário não encontrado para exclusão.');
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    } finally {
      return deletado;
    }
  }
}

module.exports = new UsuarioDAO();
