
const express = require('express');
const router = express.Router();

const ImageController = require('../controllers/ImageController');
const autenticar = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Imagens
 *   description: Gerenciamento de imagens dos produtos
 */

/**
 * @swagger
 * /imagens:
 *   post:
 *     summary: Cadastra uma imagem para um produto
 *     tags: [Imagens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Imagem cadastrada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post('/', autenticar, ImageController.cadastrar);

/**
 * @swagger
 * /imagens/produto/{produtoId}:
 *   get:
 *     summary: Lista as imagens de um produto
 *     tags: [Imagens]
 *     parameters:
 *       - in: path
 *         name: produtoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de imagens retornada com sucesso
 */
router.get('/produto/:produtoId', ImageController.listarPorProduto);

/**
 * @swagger
 * /imagens/{id}:
 *   delete:
 *     summary: Exclui uma imagem
 *     tags: [Imagens]
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
 *         description: Imagem excluída com sucesso
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', autenticar, ImageController.excluir);

module.exports = router;
