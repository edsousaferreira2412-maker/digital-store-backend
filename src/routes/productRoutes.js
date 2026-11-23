
const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const autenticar = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */
router.get('/', ProductController.listar);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Consulta um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', ProductController.buscarPorId);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cadastra um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Produto cadastrado
 *       401:
 *         description: Token não informado ou inválido
 */
router.post('/', autenticar, ProductController.cadastrar);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
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
 *         description: Produto atualizado
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', autenticar, ProductController.atualizar);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Exclui um produto
 *     tags: [Produtos]
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
 *         description: Produto excluído
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', autenticar, ProductController.excluir);

module.exports = router;
