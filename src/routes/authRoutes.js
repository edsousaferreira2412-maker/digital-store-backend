
const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Login e autenticação de usuários
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@digitalstore.com
 *               senha:
 *                 type: string
 *                 example: SenhaTeste123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: E-mail ou senha inválidos
 */
router.post('/login', AuthController.login);

module.exports = router;
