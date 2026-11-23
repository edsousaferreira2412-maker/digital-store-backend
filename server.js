
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/database');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota inicial
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Digital Store funcionando!'
  });
});

// Rotas da aplicação
app.use('/usuarios', require('./src/routes/userRoutes'));
app.use('/auth', require('./src/routes/authRoutes'));
app.use('/categorias', require('./src/routes/categoryRoutes'));
app.use('/produtos', require('./src/routes/productRoutes'));
app.use('/imagens', require('./src/routes/imageRoutes'));
app.use('/opcoes', require('./src/routes/optionRoutes'));

const PORT = 3000;

// Inicia o servidor somente quando executado diretamente
if (require.main === module) {
  sequelize.authenticate()
    .then(() => {
      console.log('Banco de dados conectado com sucesso!');

      app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
    })
    .catch((erro) => {
      console.error('Erro ao conectar ao banco:', erro.message);
    });
}

module.exports = app;
