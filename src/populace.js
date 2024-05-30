const db = require('./config/database');
const PostagemDAO = require('./models/dao/PostagemDAO');
const UsuarioDAO = require('./models/dao/UsuarioDAO');

// Sincronize os modelos com o banco de dados
db.sequelize.sync({ force: true }).then(async () => {

  console.log('Inserindo dados de exemplo.');

  // Adicionando os usuários
  await UsuarioDAO.create({
    nome: 'Matthew Hettinger',
    email: 'matthewh@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Kristin Sykes',
    email: 'kristins@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Clement Merrifield',
    email: 'clementm@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Tommy Blackburn',
    email: 'tommyb@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Agnes Walker',
    email: 'agnesw@example.com',
    senha: 'senha123',
  })

  let post = await PostagemDAO.create({
    idUsuario: 1,
    titulo: "Um post",
    conteudo: "Conteúdo de um post",
    dataHora: new Date('2020-11-11T03:24:00')
  });

  let autor = await post.getAutor()
  console.log("Autor:", autor.nome)

  console.log('Dados de exemplo criados com sucesso.');
  process.exit(0);
});
