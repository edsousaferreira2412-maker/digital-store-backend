
const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');
const autenticar = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 */
router.get('/', CategoryController.listar);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cadastra uma categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Categoria cadastrada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post('/', autenticar, CategoryController.cadastrar);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categorias]
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
 *         description: Categoria atualizada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', autenticar, CategoryController.atualizar);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Exclui uma categoria
 *     tags: [Categorias]
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
 *         description: Categoria excluída com sucesso
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', autenticar, CategoryController.excluir);

module.exports = router;
