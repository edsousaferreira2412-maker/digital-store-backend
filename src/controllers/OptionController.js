const { Option, Product } = require('../models');

async function cadastrar(req, res) {
  try {
    const { nome, valor, produtoId } = req.body;

    if (!nome || !valor || !produtoId) {
      return res.status(400).json({
        mensagem: 'Informe o nome, o valor e o ID do produto.'
      });
    }

    const produto = await Product.findByPk(produtoId);

    if (!produto) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado.'
      });
    }

    const opcao = await Option.create({ nome, valor, produtoId });

    return res.status(201).json(opcao);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao cadastrar opção.'
    });
  }
}

async function listarPorProduto(req, res) {
  try {
    const produto = await Product.findByPk(req.params.produtoId);

    if (!produto) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado.'
      });
    }

    const opcoes = await Option.findAll({
      where: { produtoId: req.params.produtoId }
    });

    return res.status(200).json(opcoes);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao listar opções.'
    });
  }
}

async function excluir(req, res) {
  try {
    const opcao = await Option.findByPk(req.params.id);

    if (!opcao) {
      return res.status(404).json({
        mensagem: 'Opção não encontrada.'
      });
    }

    await opcao.destroy();

    return res.status(200).json({
      mensagem: 'Opção excluída com sucesso!'
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao excluir opção.'
    });
  }
}

module.exports = { cadastrar, listarPorProduto, excluir };