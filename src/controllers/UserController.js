
const { User } = require('../models');
const bcrypt = require('bcrypt');

async function cadastrar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos.'
      });
    }

    const usuarioExistente = await User.findOne({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(409).json({
        mensagem: 'Este e-mail já está cadastrado.'
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await User.create({
      nome,
      email,
      senha: senhaCriptografada
    });

    return res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao cadastrar usuário.'
    });
  }
}

async function listar(req, res) {
  try {
    const usuarios = await User.findAll({
      attributes: ['id', 'nome', 'email']
    });

    return res.status(200).json(usuarios);
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao listar usuários.'
    });
  }
}

async function atualizar(req, res) {
  try {
    const { nome, email, senha } = req.body;

    const usuario = await User.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        mensagem: 'Usuário não encontrado.'
      });
    }

    if (!nome || !email) {
      return res.status(400).json({
        mensagem: 'Informe nome e e-mail.'
      });
    }

    const emailExistente = await User.findOne({
      where: { email }
    });

    if (emailExistente && emailExistente.id !== usuario.id) {
      return res.status(409).json({
        mensagem: 'Este e-mail já está cadastrado.'
      });
    }

    const dadosAtualizados = { nome, email };

    if (senha) {
      dadosAtualizados.senha = await bcrypt.hash(senha, 10);
    }

    await usuario.update(dadosAtualizados);

    return res.status(200).json({
      mensagem: 'Usuário atualizado com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao atualizar usuário.'
    });
  }
}

async function excluir(req, res) {
  try {
    const usuario = await User.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        mensagem: 'Usuário não encontrado.'
      });
    }

    await usuario.destroy();

    return res.status(200).json({
      mensagem: 'Usuário excluído com sucesso!'
    });
  } catch (erro) {
    return res.status(500).json({
      mensagem: 'Erro ao excluir usuário.'
    });
  }
}

module.exports = {
  cadastrar,
  listar,
  atualizar,
  excluir
};
