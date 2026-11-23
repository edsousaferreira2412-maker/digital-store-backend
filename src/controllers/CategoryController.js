
const { Category } = require('../models');

async function cadastrar(req, res) {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({
        mensagem: 'Informe o nome da categoria.'
      });
    }

    const categoria = await Category.create({ nome });

    return res.status(201).json(categoria);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao cadastrar categoria.'
    });
  }
}

async function listar(req, res) {
  try {
    const categorias = await Category.findAll();

    return res.status(200).json(categorias);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao listar categorias.'
    });
  }
}

async function atualizar(req, res) {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({
        mensagem: 'Informe o nome da categoria.'
      });
    }

    const categoria = await Category.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        mensagem: 'Categoria não encontrada.'
      });
    }

    await categoria.update({ nome });

    return res.status(200).json({
      mensagem: 'Categoria atualizada com sucesso!',
      categoria
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao atualizar categoria.'
    });
  }
}

async function excluir(req, res) {
  try {
    const categoria = await Category.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        mensagem: 'Categoria não encontrada.'
      });
    }

    await categoria.destroy();

    return res.status(200).json({
      mensagem: 'Categoria excluída com sucesso!'
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao excluir categoria. Verifique se existem produtos vinculados.'
    });
  }
}

module.exports = {
  cadastrar,
  listar,
  atualizar,
  excluir
};
