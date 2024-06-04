// Importando as dependências necessárias
const db = require('../config/database');
const { Model, DataTypes } = require('sequelize');

// Definindo a classe Resposta que estende Model do Sequelize
class Resposta extends Model {
  // Aqui podem vir métodos que essa classe pode executar, se necessário

  // Definindo as associações com as classes Usuario e Postagem
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'idUsuario', as: 'usuario' });
    this.belongsTo(models.Postagem, { foreignKey: 'idPostagem', as: 'postagem' });
  }
}

// Inicializando a classe Resposta com o esquema do banco de dados
Resposta.init({
  // Identificador do usuário que respondeu à postagem
  idUsuario: { type: DataTypes.INTEGER, allowNull: false },
  // Identificador da postagem à qual a resposta se refere
  idPostagem: { type: DataTypes.INTEGER, allowNull: false },
  // Conteúdo da resposta
  conteudo: { type: DataTypes.TEXT, allowNull: false }, // Usando TEXT para conteúdos longos
  // Data e hora em que a resposta foi criada
  dataHora: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }, // Default para a data e hora atual
}, {
  sequelize: db.sequelize, // Conexão com o banco de dados
  modelName: 'Resposta', // Nome do modelo
  tableName: 'respostas', // Nome da tabela no banco de dados
});

// Exportando a classe Resposta
module.exports = Resposta;
