const Resposta = require('../Resposta'); // Importe o modelo de resposta

class RespostaDAO {
  // Cria e persiste uma resposta
  async create({ idUsuario, idPostagem, conteudo }) {
    let newResposta;
    try {
      newResposta = await Resposta.create({ idUsuario, idPostagem, conteudo });
    } catch (error) {
      console.error('Erro ao criar resposta:', error);
    } finally {
      return newResposta; // Retorne a resposta criada
    }
  }

  // Busca todas as respostas do banco de dados
  async getAll() {
    let respostas;
    try {
      respostas = await Resposta.findAll();
    } catch (error) {
      console.error('Erro ao buscar respostas:', error);
    } finally {
      return respostas;
    }
  }

  async getRespostaByPostagem(post){
    let respostas;
    try {
      respostas = await Resposta.findAll({where: {idPostagem: post.id} })
    } catch(error){
      console.error("erro ao buscar comentario: ", error);
    } finally{
      return respostas;
    }
  }

  // Busca uma resposta no banco de dados pela sua ID
  async getById(respostaId) {
    let resposta;
    try {
      resposta = await Resposta.findByPk(respostaId);
    } catch (error) {
      console.error('Erro ao buscar resposta por ID:', error);
    } finally {
      return resposta;
    }
  }

  // Atualiza uma resposta no banco de dados
  async update(respostaId, respostaAtualizada) {
    let resposta;
    try {
      resposta = await Resposta.findByPk(respostaId);
      if (resposta) {
        resposta.idUsuario = respostaAtualizada.idUsuario || resposta.idUsuario; // Atualiza o campo de idUsuario se ele foi alterado
        resposta.idPostagem = respostaAtualizada.idPostagem || resposta.idPostagem; // Atualiza o campo de idPostagem se ele foi alterado
        resposta.conteudo = respostaAtualizada.conteudo || resposta.conteudo; // Atualiza o campo de conteudo se ele foi alterado
        resposta.dataHora = respostaAtualizada.dataHora || resposta.dataHora; // Atualiza o campo de dataHora se ele foi alterado
        await resposta.save(); // Salve as alterações
      } else {
        console.log('Resposta não encontrada para atualização.');
      }
    } catch (error) {
      console.error('Erro ao atualizar resposta:', error);
    } finally {
      return resposta;
    }
  }

  // Exclui uma resposta do banco de dados
  async delete(respostaId) {
    let deletado = false;
    try {
      const resposta = await Resposta.findByPk(respostaId);
      if (resposta) {
        await resposta.destroy();
        deletado = true;
      } else {
        console.error('Resposta não encontrada para exclusão.');
      }
    } catch (error) {
      console.error('Erro ao excluir resposta:', error);
    } finally {
      return deletado;
    }
  }
}

module.exports = new RespostaDAO();
