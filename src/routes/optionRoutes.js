
const express = require('express');
const router = express.Router();

const OptionController = require('../controllers/OptionController');
const autenticar = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Opções
 *   description: Gerenciamento de opções dos produtos
 */

/**
 * @swagger
 * /opcoes:
 *   post:
 *     summary: Cadastra uma opção para um produto
 *     tags: [Opções]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Opção cadastrada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post('/', autenticar, OptionController.cadastrar);

/**
 * @swagger
 * /opcoes/produto/{produtoId}:
 *   get:
 *     summary: Lista as opções de um produto
 *     tags: [Opções]
 *     parameters:
 *       - in: path
 *         name: produtoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de opções retornada com sucesso
 */
router.get('/produto/:produtoId', OptionController.listarPorProduto);

/**
 * @swagger
 * /opcoes/{id}:
 *   delete:
 *     summary: Exclui uma opção
 *     tags: [Opções]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Opção excluída com sucesso
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', autenticar, OptionController.excluir);

module.exports = router;
