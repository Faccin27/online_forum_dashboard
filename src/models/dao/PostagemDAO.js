const Postagem = require('../Postagem'); // Importe o modelo da postagem

class PostagemDAO {
  // Cria e persiste uma postagem
  async create({ idUsuario, titulo, conteudo, dataHora }) {
    let newPostagem;
    try {
      newPostagem = await Postagem.create({ idUsuario, titulo, conteudo, dataHora });
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    } finally {
      return newPostagem; // Retorne a postagem criada
    }
  }
}

module.exports = new PostagemDAO();
