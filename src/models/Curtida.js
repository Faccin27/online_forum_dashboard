// Importando as dependências necessárias
const db = require('../config/database');
const { Model, DataTypes } = require('sequelize');

// Definindo a classe Curtida que estende Model do Sequelize
class Curtida extends Model {
  // Aqui podem vir métodos que essa classe pode executar, se necessário

  // Definindo as associações com as classes Usuario e Postagem
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'idUsuario', as: 'usuario' });
    this.belongsTo(models.Postagem, { foreignKey: 'idPostagem', as: 'postagem' });
  }
}

// Inicializando a classe Curtida com o esquema do banco de dados
Curtida.init({
  // Identificador do usuário que curtiu a postagem
  idUsuario: { type: DataTypes.INTEGER, allowNull: false },
  // Identificador da postagem que foi curtida
  idPostagem: { type: DataTypes.INTEGER, allowNull: false },
}, {
  sequelize: db.sequelize, // Conexão com o banco de dados
  modelName: 'Curtida', // Nome do modelo
  tableName: 'curtidas', // Nome da tabela no banco de dados
});

// Exportando a classe Curtida
module.exports = Curtida;
