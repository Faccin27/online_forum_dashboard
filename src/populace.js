const db = require('./config/database');
const PostagemDAO = require('./models/dao/PostagemDAO');
const UsuarioDAO = require('./models/dao/UsuarioDAO');
const CurtidaDAO = require('./models/dao/CurtidaDAO');
const RespostaDAO = require('./models/dao/RespostaDAO');

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
  let comentario1 = await RespostaDAO.create({
    idUsuario: 1,
    idPostagem: 1,
    conteudo: "Muito legal",
    dataHora: new Date('2020-11-11T03:24:00')
  });
  let comentario2 = await RespostaDAO.create({
    idUsuario: 2,
    idPostagem: 2,
    conteudo: "Interessante!",
    dataHora: new Date('2020-11-11T04:30:00')
  });
  let comentario3 = await RespostaDAO.create({
    idUsuario: 3,
    idPostagem: 3,
    conteudo: "Concordo plenamente.",
    dataHora: new Date('2020-11-11T05:45:00')
  });
  let comentario4 = await RespostaDAO.create({
    idUsuario: 4,
    idPostagem: 4,
    conteudo: "Muito informativo.",
    dataHora: new Date('2020-11-11T06:10:00')
  });
  let comentario5 = await RespostaDAO.create({
    idUsuario: 5,
    idPostagem: 5,
    conteudo: "Ótimo post!",
    dataHora: new Date('2020-11-11T07:20:00')
  });
  let comentario6 = await RespostaDAO.create({
    idUsuario: 6,
    idPostagem: 6,
    conteudo: "Bem explicado.",
    dataHora: new Date('2020-11-11T08:25:00')
  });
  let comentario7 = await RespostaDAO.create({
    idUsuario: 7,
    idPostagem: 7,
    conteudo: "Ajudou bastante.",
    dataHora: new Date('2020-11-11T09:30:00')
  });
  let comentario8 = await RespostaDAO.create({
    idUsuario: 8,
    idPostagem: 8,
    conteudo: "Muito bom.",
    dataHora: new Date('2020-11-11T10:35:00')
  });
  let comentario9 = await RespostaDAO.create({
    idUsuario: 9,
    idPostagem: 9,
    conteudo: "Excelente!",
    dataHora: new Date('2020-11-11T11:40:00')
  });
  let comentario10 = await RespostaDAO.create({
    idUsuario: 10,
    idPostagem: 10,
    conteudo: "Obrigado por compartilhar.",
    dataHora: new Date('2020-11-11T12:45:00')
  });
  let comentario11 = await RespostaDAO.create({
    idUsuario: 11,
    idPostagem: 11,
    conteudo: "Gostei muito.",
    dataHora: new Date('2020-11-11T13:50:00')
  });
  let comentario12 = await RespostaDAO.create({
    idUsuario: 12,
    idPostagem: 12,
    conteudo: "Muito útil.",
    dataHora: new Date('2020-11-11T14:55:00')
  });
  let comentario13 = await RespostaDAO.create({
    idUsuario: 13,
    idPostagem: 13,
    conteudo: "Bem detalhado.",
    dataHora: new Date('2020-11-11T15:00:00')
  });
  let comentario14 = await RespostaDAO.create({
    idUsuario: 14,
    idPostagem: 14,
    conteudo: "Parabéns!",
    dataHora: new Date('2020-11-11T16:05:00')
  });
  let comentario15 = await RespostaDAO.create({
    idUsuario: 15,
    idPostagem: 15,
    conteudo: "Esclarecedor.",
    dataHora: new Date('2020-11-11T17:10:00')
  });
  let comentario16 = await RespostaDAO.create({
    idUsuario: 16,
    idPostagem: 1,
    conteudo: "Muito bom, obrigado!",
    dataHora: new Date('2020-11-11T18:15:00')
  });
  
  
  let curtida1 = await CurtidaDAO.create({
    idUsuario: 1,
    idPostagem: 1,
  });

  let curtida2 = await CurtidaDAO.create({
    idUsuario: 2,
    idPostagem: 2,
  });
  
  let curtida3 = await CurtidaDAO.create({
    idUsuario: 3,
    idPostagem: 3,
  });
  
  let curtida4 = await CurtidaDAO.create({
    idUsuario: 4,
    idPostagem: 4,
  });
  
  let curtida5 = await CurtidaDAO.create({
    idUsuario: 5,
    idPostagem: 5,
  });
  
  let curtida6 = await CurtidaDAO.create({
    idUsuario: 6,
    idPostagem: 6,
  });
  
  let curtida7 = await CurtidaDAO.create({
    idUsuario: 7,
    idPostagem: 7,
  });
  
  let curtida8 = await CurtidaDAO.create({
    idUsuario: 8,
    idPostagem: 8,
  });
  
  let curtida9 = await CurtidaDAO.create({
    idUsuario: 9,
    idPostagem: 9,
  });
  
  let curtida10 = await CurtidaDAO.create({
    idUsuario: 10,
    idPostagem: 10,
  });
  
  let curtida11 = await CurtidaDAO.create({
    idUsuario: 11,
    idPostagem: 11,
  });
  
  let curtida12 = await CurtidaDAO.create({
    idUsuario: 12,
    idPostagem: 12,
  });
  
  let curtida13 = await CurtidaDAO.create({
    idUsuario: 13,
    idPostagem: 13,
  });
  
  let curtida14 = await CurtidaDAO.create({
    idUsuario: 14,
    idPostagem: 14,
  });
  
  let curtida15 = await CurtidaDAO.create({
    idUsuario: 15,
    idPostagem: 15,
  });

  

  console.log('Dados de exemplo criados com sucesso.');
  process.exit(0);
});
