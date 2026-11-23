const { Product, Category, Image, Option } = require('../models');

async function cadastrar(req, res) {
  try {
    const { nome, descricao, preco, categoriaId } = req.body;

    if (!nome || preco === undefined || !categoriaId) {
      return res.status(400).json({
        mensagem: 'Informe nome, preço e categoria do produto.'
      });
    }

    const categoria = await Category.findByPk(categoriaId);

    if (!categoria) {
      return res.status(404).json({
        mensagem: 'Categoria não encontrada.'
      });
    }

    const produto = await Product.create({
      nome,
      descricao,
      preco,
      categoriaId
    });

    return res.status(201).json(produto);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao cadastrar produto.'
    });
  }
}

async function listar(req, res) {
  try {
    const produtos = await Product.findAll({
      include: [
        { model: Category, as: 'categoria' },
        { model: Image, as: 'imagens' },
        { model: Option, as: 'opcoes' }
      ]
    });

    return res.status(200).json(produtos);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao listar produtos.'
    });
  }
}

async function buscarPorId(req, res) {
  try {
    const produto = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'categoria' },
        { model: Image, as: 'imagens' },
        { model: Option, as: 'opcoes' }
      ]
    });

    if (!produto) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado.'
      });
    }

    return res.status(200).json(produto);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao buscar produto.'
    });
  }
}

async function atualizar(req, res) {
  try {
    const { nome, descricao, preco, categoriaId } = req.body;

    const produto = await Product.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado.'
      });
    }

    if (categoriaId) {
      const categoria = await Category.findByPk(categoriaId);

      if (!categoria) {
        return res.status(404).json({
          mensagem: 'Categoria não encontrada.'
        });
      }
    }

    await produto.update({
      nome,
      descricao,
      preco,
      categoriaId
    });

    return res.status(200).json({
      mensagem: 'Produto atualizado com sucesso!',
      produto
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao atualizar produto.'
    });
  }
}

async function excluir(req, res) {
  try {
    const produto = await Product.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado.'
      });
    }

    await produto.destroy();

    return res.status(200).json({
      mensagem: 'Produto excluído com sucesso!'
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao excluir produto.'
    });
  }
}

module.exports = {
  cadastrar,
  listar,
  buscarPorId,
  atualizar,
  excluir
};