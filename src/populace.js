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
  await UsuarioDAO.create({
    nome: 'Alice Johnson',
    email: 'alicej@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Bob Smith',
    email: 'bobsmith@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Carol Tyson',
    email: 'carolt@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'David Lee',
    email: 'davidl@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Eva Gordon',
    email: 'evag@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Frank Moore',
    email: 'frankm@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Grace Hall',
    email: 'graceh@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Henry Ward',
    email: 'henryw@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Ivy White',
    email: 'ivyw@example.com',
    senha: 'senha123',
  })
  await UsuarioDAO.create({
    nome: 'Jack Norman',
    email: 'jackn@example.com',
    senha: 'senha123',
  })


  let post1 = await PostagemDAO.create({
    idUsuario: 1,
    titulo: "Cs:go",
    conteudo: "Counter Strike",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let post2 = await PostagemDAO.create({
    idUsuario: 2,
    titulo: "GTA5",
    conteudo: "Grand Theft Auto V",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let post3 = await PostagemDAO.create({
    idUsuario: 3,
    titulo: "Minecraft",
    conteudo: "Build, explore, survive!",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let post4 = await PostagemDAO.create({
    idUsuario: 4,
    titulo: "Fortnite",
    conteudo: "Battle Royale",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let post5 = await PostagemDAO.create({
    idUsuario: 5,
    titulo: "League of Legends",
    conteudo: "MOBA Game",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let post6 = await PostagemDAO.create({
    idUsuario: 6,
    titulo: "Valorant",
    conteudo: "Tactical shooter",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let post7 = await PostagemDAO.create({
    idUsuario: 7,
    titulo: "Among Us",
    conteudo: "Social deduction game",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let post8 = await PostagemDAO.create({
    idUsuario: 8,
    titulo: "Roblox",
    conteudo: "Imagine, create, and play",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let post9 = await PostagemDAO.create({
    idUsuario: 9,
    titulo: "The Witcher 3",
    conteudo: "Wild Hunt",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let post10 = await PostagemDAO.create({
    idUsuario: 10,
    titulo: "FIFA 21",
    conteudo: "Football simulation",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let post11 = await PostagemDAO.create({
    idUsuario: 11,
    titulo: "Call of Duty",
    conteudo: "FPS Game",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let post12 = await PostagemDAO.create({
    idUsuario: 12,
    titulo: "Assassin's Creed",
    conteudo: "Action-adventure",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let post13 = await PostagemDAO.create({
    idUsuario: 13,
    titulo: "Cyberpunk 2077",
    conteudo: "Open world RPG",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let post14 = await PostagemDAO.create({
    idUsuario: 14,
    titulo: "Animal Crossing",
    conteudo: "Social simulation",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let post15 = await PostagemDAO.create({
    idUsuario: 15,
    titulo: "Skyrim",
    conteudo: "The Elder Scrolls V",
    dataHora: new Date('2020-11-11T03:24:00')
  });



  let autor = await post.getAutor()
  console.log("Autor:", autor.nome)

  console.log('Dados de exemplo criados com sucesso.');
  process.exit(0);
});
