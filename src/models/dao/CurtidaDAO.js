const Curtida = require('../Curtida'); // Importe o modelo de curtida

class CurtidaDAO {
  // Cria e persiste uma curtida
  async create({ idUsuario, idPostagem }) {
    let newCurtida;
    try {
      newCurtida = await Curtida.create({ idUsuario, idPostagem });
    } catch (error) {
      console.error('Erro ao criar curtida:', error);
    } finally {
      return newCurtida; // Retorne a curtida criada
    }
  }

  // Busca todas as curtidas do banco de dados
  async getAll() {
    let curtidas;
    try {
      curtidas = await Curtida.findAll();
    } catch (error) {
      console.error('Erro ao buscar curtidas:', error);
    } finally {
      return curtidas;
    }
  }

  // Busca uma curtida no banco de dados pela sua ID
  async getById(curtidaId) {
    let curtida;
    try {
      curtida = await Curtida.findByPk(curtidaId);
    } catch (error) {
      console.error('Erro ao buscar curtida por ID:', error);
    } finally {
      return curtida;
    }
  }

  // Atualiza uma curtida no banco de dados
  async update(curtidaId, curtidaAtualizada) {
    let curtida;
    try {
      curtida = await Curtida.findByPk(curtidaId);
      if (curtida) {
        curtida.idUsuario = curtidaAtualizada.idUsuario || curtida.idUsuario; // Atualiza o campo de idUsuario se ele foi alterado
        curtida.idPostagem = curtidaAtualizada.idPostagem || curtida.idPostagem; // Atualiza o campo de idPostagem se ele foi alterado
        await curtida.save(); // Salve as alterações
      } else {
        console.log('Curtida não encontrada para atualização.');
      }
    } catch (error) {
      console.error('Erro ao atualizar curtida:', error);
    } finally {
      return curtida;
    }
  }

  // Exclui uma curtida do banco de dados
  async delete(curtidaId) {
    let deletado = false;
    try {
      const curtida = await Curtida.findByPk(curtidaId);
      if (curtida) {
        await curtida.destroy();
        deletado = true;
      } else {
        console.error('Curtida não encontrada para exclusão.');
      }
    } catch (error) {
      console.error('Erro ao excluir curtida:', error);
    } finally {
      return deletado;
    }
  }
}

module.exports = new CurtidaDAO();
