const Postagem = require('../Postagem'); // Importe o modelo da postagem
const User = require('../Usuario'); // Importe o modelo do usuário
const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require("../../config/database");

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
      newPostagem = await sequelize.query(
        `SELECT postagens.*, usuarios.nome 
         FROM postagens 
         LEFT JOIN usuarios 
         ON postagens.idUsuario = usuarios.id;`
        , {
          type: Sequelize.QueryTypes.SELECT,
        });



      console.log("quiaba", newPostagem)
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

  async delete(postagemId) {
    try {
      const result = await Postagem.destroy({
        where: {
          id: postagemId
        }
      });
      if (result === 1) {
        return { success: true, message: 'Postagem deletada com sucesso.' };
      } else {
        return { success: false, message: 'Postagem não encontrada.' };
      }
    } catch (error) {
      console.error('Erro ao deletar postagem:', error);
      return { success: false, message: 'Erro ao deletar postagem.' };
    }
  }
}




module.exports = new PostagemDAO();
