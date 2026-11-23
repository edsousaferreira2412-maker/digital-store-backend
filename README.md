# Digital Store Backend

API desenvolvida como projeto final, com o objetivo de gerenciar os dados de uma loja virtual.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- Sequelize
- JWT (autenticação)
- Bcrypt (criptografia de senhas)
- Jest e Supertest (testes automatizados)

## Funcionalidades

- Cadastro, consulta, atualização e exclusão de usuários.
- Autenticação de usuários com JWT.
- Cadastro, consulta, atualização e exclusão de categorias.
- Cadastro, consulta, atualização e exclusão de produtos.
- Cadastro, consulta e exclusão de imagens.
- Cadastro, consulta e exclusão de opções dos produtos.
- Proteção de rotas por autenticação.

## Instalação

Instale as dependências do projeto:

```bash
npm install
```

## Configuração do banco de dados

Crie um banco de dados MySQL chamado `digital_store`.

Configure o arquivo `.env` na pasta principal:

```env
DB_NAME=digital_store
DB_USER=root
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=sua_chave_secreta
```

Substitua os valores de exemplo pelas configurações locais. Não compartilhe o arquivo `.env`.

## Executar as migrations

```bash
npx sequelize-cli db:migrate
```

## Iniciar o servidor

```bash
npm start
```

O servidor será iniciado na porta 3000.

Endereço local: http://localhost:3000

## Testes automatizados

Para executar os testes:

```bash
npm test
```

## Principais rotas

| Método | Rota | Descrição |
|---|---|---|
| POST | /usuarios | Cadastrar usuário |
| GET | /usuarios | Listar usuários |
| PUT | /usuarios/:id | Atualizar usuário |
| DELETE | /usuarios/:id | Excluir usuário |
| POST | /auth/login | Realizar login |
| GET | /categorias | Listar categorias |
| POST | /categorias | Cadastrar categoria |
| PUT | /categorias/:id | Atualizar categoria |
| DELETE | /categorias/:id | Excluir categoria |
| GET | /produtos | Listar produtos |
| GET | /produtos/:id | Consultar produto |
| POST | /produtos | Cadastrar produto |
| PUT | /produtos/:id | Atualizar produto |
| DELETE | /produtos/:id | Excluir produto |
| POST | /imagens | Cadastrar imagem |
| GET | /imagens/produto/:produtoId | Listar imagens |
| DELETE | /imagens/:id | Excluir imagem |
| POST | /opcoes | Cadastrar opção |
| GET | /opcoes/produto/:produtoId | Listar opções |
| DELETE | /opcoes/:id | Excluir opção |

## Autenticação

As rotas protegidas exigem um token JWT.

Primeiro, realize o login pela rota `POST /auth/login`. Utilize o token recebido no cabeçalho das requisições protegidas:

`Authorization: Bearer SEU_TOKEN`

## Testes realizados

Os testes automatizados verificam:

- Funcionamento da rota inicial.
- Listagem de produtos.
- Listagem de categorias.
