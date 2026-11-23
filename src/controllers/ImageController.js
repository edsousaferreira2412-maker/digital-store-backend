const { Image, Product } = require('../models');

async function cadastrar(req, res) {
  try {
    const { caminho, produtoId } = req.body;

    if (!caminho || !produtoId) {
      return res.status(400).json({
        mensagem: 'Informe o caminho da imagem e o ID do produto.'
      });
    }

    const produto = await Product.findByPk(produtoId);

    if (!produto) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado.'
      });
    }

    const imagem = await Image.create({ caminho, produtoId });

    return res.status(201).json(imagem);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao cadastrar imagem.'
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

    const imagens = await Image.findAll({
      where: { produtoId: req.params.produtoId }
    });

    return res.status(200).json(imagens);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao listar imagens.'
    });
  }
}

async function excluir(req, res) {
  try {
    const imagem = await Image.findByPk(req.params.id);

    if (!imagem) {
      return res.status(404).json({
        mensagem: 'Imagem não encontrada.'
      });
    }

    await imagem.destroy();

    return res.status(200).json({
      mensagem: 'Imagem excluída com sucesso!'
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao excluir imagem.'
    });
  }
}

module.exports = { cadastrar, listarPorProduto, excluir };