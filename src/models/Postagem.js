// Importando as dependências necessárias
const db = require('../config/database');
const { Model, DataTypes } = require('sequelize');
const UsuarioDAO = require('./dao/UsuarioDAO');

// Definindo a classe Postagem que estende Model do Sequelize
class Postagem extends Model {
  // Método para obter o autor da postagem
  async getAutor() {
    try {
      const autor = await UsuarioDAO.getById(this.idUsuario);
      return autor;
    } catch (error) {
      console.error('Erro ao obter o autor:', error);
      throw error;
    }
  }

  // Definindo a associação com a classe Usuario
  static associate(models) {
    // Relacionamento 1 para N com Curtida
    this.hasMany(models.Curtida, { foreignKey: 'idPostagem', as: 'curtidas' });
    // Relacionamento 1 para N com Resposta
    this.hasMany(models.Resposta, { foreignKey: 'idPostagem', as: 'respostas' });
  }
}

// Inicializando a classe Postagem com o esquema do banco de dados
Postagem.init({
  // Identificador do usuário que criou a postagem
  idUsuario: { type: DataTypes.INTEGER, allowNull: false },
  // Título da postagem
  titulo: { type: DataTypes.STRING, allowNull: false },
  // Conteúdo da postagem
  conteudo: { type: DataTypes.TEXT, allowNull: false }, // Usando TEXT para conteúdos longos
  // Data e hora em que a postagem foi criada
  dataHora: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }, // Default para a data e hora atual
}, {
  sequelize: db.sequelize, // Conexão com o banco de dados
  modelName: 'Postagem', // Nome do modelo
  tableName: 'postagens', // Nome da tabela no banco de dados
});

// Exportando a classe Postagem
module.exports = Postagem;
