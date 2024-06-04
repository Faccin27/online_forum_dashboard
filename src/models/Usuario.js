// Importando as dependências necessárias
const db = require('../config/database');
const { Model, DataTypes } = require('sequelize');

// Definindo a classe Usuario que estende Model do Sequelize
class Usuario extends Model {
  static associate(models) {
  
    this.hasMany(models.Postagem, { foreignKey: 'idUsuario', as: 'postagens' });
    
    this.hasMany(models.Curtida, { foreignKey: 'idUsuario', as: 'curtidas' });
    
    this.hasMany(models.Resposta, { foreignKey: 'idUsuario', as: 'respostas' });
  }
}


// Inicializando a classe User com o esquema do banco de dados
Usuario.init({
  // Nome não pode ser null
  nome: { type: DataTypes.STRING, allowNull: false },
  // Email não pode ser null e é únicoS
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  // Senha não pode ser null
  senha: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize: db.sequelize, // Conexão com o banco de dados
  modelName: 'Usuario', // Nome do modelo
  tableName: 'usuarios', // Nome da tabela no banco de dados
});

// Exportando a classe Usuario
module.exports = Usuario;
