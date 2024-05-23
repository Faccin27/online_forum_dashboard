class Produto {
  constructor({ id, nome, promocao, preco, desconto, precoPromocao }) {
    this.id = id;
    this.nome = nome;
    this.promocao = promocao ? promocao : false;
    this.desconto = desconto ? desconto : 0;
    this.preco = preco;
    this.precoPromocao = precoPromocao ? precoPromocao : preco;
  }

  calculaPromocao(desconto) {
    let percetual = ((100 - parseInt(this.desconto)) / 100);
    this.precoPromocao = parseFloat(this.preco * percetual);
  }
}

module.exports = Produto
