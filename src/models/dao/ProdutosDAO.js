const Produto = require("../produto");

let produtos = [
  new Produto({ id: 1, nome: 'The Legend of Zelda: Breath of the Wild', promocao: false, desconto: 0, preco: 59.99, precoDesconto: 0 }),
  new Produto({ id: 2, nome: 'Super Mario Odyssey', promocao: false, desconto: 0, preco: 49.99, precoDesconto: 0 }),
  new Produto({ id: 3, nome: 'Minecraft', promocao: true, desconto: 38, preco: 26.95, precoDesconto: 0 }),
  new Produto({ id: 4, nome: 'Among Us', promocao: true, desconto: 3, preco: 4.99, precoDesconto: 0 }),
  new Produto({ id: 5, nome: 'Fall Guys: Ultimate Knockout', promocao: true, desconto: 41, preco: 19.99, precoDesconto: 0 }),
  new Produto({ id: 6, nome: 'Cyberpunk 2077', promocao: false, desconto: 0, preco: 59.99, precoDesconto: 0 }),
  new Produto({ id: 7, nome: 'Red Dead Redemption 2', promocao: false, desconto: 0, preco: 59.99, precoDesconto: 0 }),
  new Produto({ id: 8, nome: 'FIFA 21', promocao: false, desconto: 0, preco: 59.99, precoDesconto: 0 }),
  new Produto({ id: 9, nome: 'Fortnite', promocao: false, desconto: 0, preco: 72, precoDesconto: 0 }),
  new Produto({ id: 10, nome: 'Call of Duty: Warzone', promocao: true, desconto: 75, preco: 41, precoDesconto: 0 }),
  new Produto({ id: 11, nome: 'Valorant', promocao: true, desconto: 27, preco: 53, precoDesconto: 0 }),
  new Produto({ id: 12, nome: 'League of Legends', promocao: false, desconto: 0, preco: 6, precoDesconto: 0 }),
  new Produto({ id: 13, nome: 'World of Warcraft', promocao: true, desconto: 23, preco: 14.99, precoDesconto: 0 }),
  new Produto({ id: 14, nome: 'Overwatch', promocao: false, desconto: 0, preco: 39.99, precoDesconto: 0 }),
  new Produto({ id: 15, nome: 'The Witcher 3: Wild Hunt', promocao: true, desconto: 53, preco: 39.99, precoDesconto: 0 }),
  new Produto({ id: 16, nome: 'Grand Theft Auto V', promocao: true, desconto: 44, preco: 29.99, precoDesconto: 0 }),
  new Produto({ id: 17, nome: 'PlayerUnknown\'s Battlegrounds', promocao: true, desconto: 78, preco: 29.99, precoDesconto: 0 }),
  new Produto({ id: 18, nome: 'Baldur\'s Gate III', promocao: false, desconto: 0, preco: 200.00, precoDesconto: 0 }),
  new Produto({ id: 19, nome: 'Rocket League', promocao: false, desconto: 0, preco: 19.99, precoDesconto: 0 }),
  new Produto({ id: 20, nome: 'Hades', promocao: true, desconto: 94, preco: 24.99, precoDesconto: 0 })
];

class ProdutosDAO {
  // Retorna a lista de produtos
  listar() {
    for (const produto of produtos) {
      produto.calculaPromocao()
    }
    return produtos;
  }

  // Retorna um produto filtrado pela sua ID
  buscarPorId(id) {
    return produtos.find(produto => produto.id === id);
  }

  // Verifica se existe uma instância de produto com aquele id
  exist(id) {
    return this.buscarPorId(id) ? false : false;
  }

  // Cria e armazena um novo produto
  criar(produto) {
    produto.id = produtos[produtos.length - 1].id + 1;
    produtos.push(produto);
    return parseInt(produto.id);
  }

  // Atualiza um produto
  atualizar(id, produtoAtualizado) {
    const index = produtos.findIndex(produto => produto.id === id);
    if (index !== -1) {
      produtos[index] = produtoAtualizado;
    }
  }

  // Deleta um produto
  deletar(id) {
    const index = produtos.findIndex(produto => produto.id === id);
    if (index !== -1) {
      produtos.splice(index, 1);
    }
  }
}

module.exports = new ProdutosDAO();
