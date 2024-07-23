# Cadastro de Pagamentos

Esta aplicação é uma API REST desenvolvida com NestJS para gerenciar o cadastro de pagamentos, incluindo a validação de contas, atualização de saldo, armazenamento de pagamentos no banco de dados e geração de relatórios de transações.

## Índice

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Tecnologias](#tecnologias)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação

### Usando Docker Compose

1. Clone o repositório:

   ```bash
   git clone https://github.com/bodescorp/API-bank.git
   cd API-bank
   ```

2. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

   ```env
   DATABASE_HOST=
   DATABASE_PORT=
   DATABASE_USER=
   DATABASE_PASSWORD=
   DATABASE_NAME=

   JWT_SECRET=
   JWT_EXPIRATION_TIME=

   S3_BUCKET=
   S3_REGION=
   S3_ACCESSKEYID=
   S3_SECRETACCESSKEY=
   ```

3. Construa e inicie os containers Docker:

   ```bash
   docker-compose up --build
   ```

4. A API estará disponível em `http://localhost:3000`.

### Manualmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/bodescorp/API-bank.git
   cd API-bank
   ```

2. Instale as dependências:

   ```bash
   yarn install
   ```

3. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

   ```env
   DATABASE_HOST=
   DATABASE_PORT=
   DATABASE_USER=
   DATABASE_PASSWORD=
   DATABASE_NAME=

   JWT_SECRET=
   JWT_EXPIRATION_TIME=

   S3_BUCKET=
   S3_REGION=
   S3_ACCESSKEYID=
   S3_SECRETACCESSKEY=
   ```

4. Configure a conexão com o banco de dados no arquivo `src/app.module.ts` se necessário.

5. Inicie o Banco de Dados:

   ```bash
   yarn migration:run
   ```

6. Inicie o servidor:

   ```bash
   yarn start:dev
   ```

7. A API estará disponível em `http://localhost:3000`.

## Uso

1. Para iniciar a aplicação com Docker Compose:

   ```bash
   docker-compose up --build
   ```

2. Para parar os containers:

   ```bash
   docker-compose down
   ```

## Endpoints

### Usuarios

- `POST /users`
  - **Descrição:** Criação de usuário e retorna o usuario criado.
  - **Body:** `{ "username": "seu-email", "password": "sua-senha" }`
  - **Resposta:** `{ "id": "id", "username":"seu-email"}`

### Autenticação

- `POST /auth/login`
  - **Descrição:** Autentica um usuário e retorna um token JWT.
  - **Body:** `{ "username": "seu-email", "password": "sua-senha" }`
  - **Resposta:** `{ "token": "seu-token", "expiresIn":3600}`

### Contas

- `POST /accounts`

  - **Descrição:** Cria uma nova conta.
  - **Autenticação:** Bearer token
  - **Body:** `{ "nome": "nome", 	"tipo_de_conta": "tipo", 	"saldo_inicial": 1 }`
  - **Resposta:** `{ "nome": "nome", 	"tipo_de_conta": "tipo", 	"saldo_inicial": 1 }`

- `GET /account`

  - **Descrição:** Retorna a lista de contas.
  - **Autenticação:** Bearer token
  - **Parâmetros Query Opcionais**:
    - `nome`: Filtra contas pelo nome.
    - `tipo_de_conta`: Filtra contas por tipo de conta.
  - **Resposta:** `[ {"id": "id",	"nome": "nome", "tipo_de_conta": "tipo",	"saldo_inicial": 3}, ... ]`

  - `GET /account/id`
  - **Descrição:** Retorna um conta específica.
  - **Autenticação:** Bearer token
  - **Resposta:** `{"id": "id",	"nome": "nome", "tipo_de_conta": "tipo",	"saldo_inicial": 3}`

- `PUT /account/id`

  - **Descrição:** Atualiza um conta específica.
  - **Autenticação:** Bearer token
  - **Body:** `{"id": "id",	"nome": "nome", "tipo_de_conta": "tipo",	"saldo_inicial": 3}`

- `DELETE /account/id`
  - **Descrição:** Remove um conta específica.
  - **Autenticação:** Bearer token

### Pagamentos

- `POST /payments`

  - **Descrição:** Registra um novo pagamento.
  - **Autenticação:** Bearer token
  - **Body:** `{    "id_account": "1", "valor": 1, "data": "2024-06-10", "descricao": "pagamento" }`
  - **Resposta:** `{ "id": 1, "id_account": 1, "valor": 1, "descricao": "Pagamento", "data": "2024-06-10" }`

- `GET /payments/id`

  - **Descrição:** Retorna um pagamento específico.
  - **Autenticação:** Bearer token
  - **Resposta:** `{ 	"id": "1", 	"id_account": "1", "data": "2024-06-10", "descricao": "pagamento de 2,50",	"valor": 1.5, "image": "LINK" }`

  `POST /payments/id`

  - **Descrição:** Upload de imagem para um pagamento específico.
  - **Autenticação:** Bearer token
  - **Body:** `{"file": "example.png"}`

### Relatórios

- `GET /reports/id`
  - **Descrição:** Gera um relatório de transações.
  - **Autenticação:** Bearer token
  - **Parâmetros Query Opcionais**:
    - `startDate`: Filtra Pagamentos pelo intervalo de datas.
    - `endDate`: Filtra Pagamentos intervalo de datas.
  - **Resposta:** `{ "payments": [{ "id": "1", "id_account": "1", "descricao": "descrição", "data": "2024-06-03T00:00:00.000Z", "valor": 1}...],"totalAmount": 1}`

## Tecnologias

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [AWS S3](https://docs.aws.amazon.com/s3/)

## Contribuição

1. Faça um fork do repositório.
2. Crie uma nova branch com sua feature: `git checkout -b minha-feature`.
3. Commit suas mudanças: `git commit -m 'Adiciona minha feature'`.
4. Faça um push para a branch: `git push origin minha-feature`.
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
