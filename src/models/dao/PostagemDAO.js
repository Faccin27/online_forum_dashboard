const Postagem = require('../Postagem'); // Importe o modelo da postagem
const User = require('../Usuario'); // Importe o modelo do usuário

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


async getAll() {
  let newPostagem;
  try {
    newPostagem = await Postagem.findAll({});
  } catch (error) {
    console.error('Erro ao buscar postagens:', error);
  } finally {
    return newPostagem;
  }
}

// Busca um post no banco de dados pela sua ID
async getById(postagemId) {
  let newPostagem;
  try {
    newPostagem = await Postagem.findByPk(postagemId);
  } catch (error) {
    console.error('Erro ao buscar post por ID:', error);
  } finally {
    return newPostagem;
  }
}
}




module.exports = new PostagemDAO();
