<div align="center">

# 🔗 Conecta Service

**Sistema de prestação e contratação de serviços**

Conectando profissionais autônomos a quem precisa deles, de forma simples, rápida e segura.

![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=black)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)

</div>

---

## 💡 Sobre o projeto

Hoje, quem precisa de um serviço (eletricista, diarista, designer, professor particular...) costuma depender de indicação, o famoso "boca a boca". Do outro lado, muitos profissionais autônomos têm pouca visibilidade e ficam limitados à sua região.

O **Conecta Service** é uma plataforma digital que aproxima os dois lados:

- **Prestadores** divulgam seus serviços e ganham visibilidade.
- **Contratantes** encontram profissionais com mais rapidez, segurança e confiança.

Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas (ADS - AMS) da **Fatec Jales**, 2026.

## 📍 Status atual

O projeto está em desenvolvimento. O que já funciona:

- ✅ Cadastro de usuário (nome, e-mail, CPF e senha), com validação de CPF
- ✅ Login com token JWT
- ✅ Senhas guardadas com hash (Argon2), nunca em texto
- ✅ Telas de boas-vindas, login e criar conta
- ✅ API documentada com Swagger e suíte de testes automatizados

O que ainda vem pela frente:

- 🚧 Recuperação de senha (por enquanto só a tela)
- 🚧 Escolha entre ser contratante ou prestador na tela de cadastro (hoje todo cadastro entra como contratante)
- ⏳ Cadastro de serviços, busca de prestadores, avaliações e pagamentos

## 🧩 Como funciona

```
App (Expo / React Native)  ──HTTP + JSON──▶  API (NestJS)  ──Prisma──▶  PostgreSQL
```

O app nunca fala direto com o banco: ele envia o cadastro e o login para a API, que valida, grava e devolve o resultado.

## 🛠️ Tecnologias

| Parte | Tecnologias |
|---|---|
| **Frontend** | Expo (SDK 54), React Native, React 19 |
| **Backend** | NestJS 11, TypeScript, Prisma 7, Zod, Argon2, JWT, Swagger |
| **Banco de dados** | PostgreSQL |
| **Testes** | Vitest, Supertest |

## 📁 Estrutura

```
conecta-service/
├── backend/                 # API (NestJS)
│   ├── prisma/              # schema, migrations e seed
│   ├── src/
│   │   ├── modules/auth/    # cadastro e login
│   │   ├── modules/health/  # verificação da API e do banco
│   │   ├── config/          # variáveis de ambiente e CORS
│   │   ├── database/        # conexão com o banco (Prisma)
│   │   └── common/          # tratamento de erros
│   └── test/                # testes de integração
└── frontend/                # App (Expo)
    ├── components/          # componente base das telas
    ├── screens/             # telas do app
    ├── services/            # chamadas à API
    ├── utils/               # utilitários
    └── img/                 # imagens
```

## ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) 22 ou superior
- [Git](https://git-scm.com/)
- PostgreSQL, de **uma** destas formas:
  - [Docker Desktop](https://www.docker.com/products/docker-desktop/) (o projeto já traz um `compose.yaml`), ou
  - PostgreSQL instalado na sua máquina
- Para testar no celular: o app **Expo Go**

## 🚀 Como rodar

### 1. Clonar o repositório

```bash
git clone https://github.com/guilhermezanardi07/conecta-service.git
cd conecta-service
```

### 2. Configurar e subir o backend

```bash
cd backend
```

**2.1. Crie o arquivo `.env`** a partir do exemplo:

```bash
# Git Bash / Linux / macOS
cp .env.example .env

# PowerShell
copy .env.example .env
```

**2.2. Gere o segredo do JWT** e cole no `JWT_SECRET` do `.env`:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

**2.3. Preencha o `.env`.** Exemplo usando o banco do Docker:

```dotenv
NODE_ENV=development
PORT=3000
SWAGGER_ENABLED=true

POSTGRES_USER=conecta
POSTGRES_PASSWORD=escolha_uma_senha
POSTGRES_DB=conecta_service
DATABASE_URL="postgresql://conecta:escolha_uma_senha@127.0.0.1:5433/conecta_service?schema=public"

# Endereço onde o app abre no navegador (Expo web)
CORS_ORIGINS=http://localhost:8081

JWT_SECRET=cole_aqui_o_segredo_gerado
JWT_EXPIRES_IN_SECONDS=900
```

Se preferir usar o **PostgreSQL instalado na sua máquina**, não precisa das variáveis `POSTGRES_*`. Ajuste só a `DATABASE_URL` com o seu usuário, senha e porta:

```dotenv
DATABASE_URL="postgresql://postgres:SUA_SENHA@127.0.0.1:5432/conecta_service?schema=public"
```

> O arquivo `.env` guarda senhas e **não vai para o GitHub** (já está no `.gitignore`).

**2.4. Suba o banco** (só se estiver usando Docker):

```bash
docker compose up -d
```

> O `compose.yaml` expõe o banco na porta `5433`. Se você já tem um PostgreSQL local nessa porta, não suba o Docker.

**2.5. Instale, crie as tabelas e rode o backend:**

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run start:dev
```

O que cada comando faz:

| Comando | Para que serve |
|---|---|
| `npm install` | Instala as dependências |
| `npx prisma generate` | Gera o cliente do Prisma (essa pasta não vai para o Git) |
| `npx prisma migrate deploy` | Cria as tabelas no banco |
| `npx prisma db seed` | Cria os tipos de usuário (contratante, prestador e administrador). **Sem isso o cadastro não funciona** |
| `npm run start:dev` | Sobe a API em `http://localhost:3000` |

Para conferir, abra `http://localhost:3000/api/health`. Deve aparecer `"database":"up"`.

### 3. Rodar o frontend

Em **outro terminal**, na raiz do projeto:

```bash
cd frontend
npm install
npx expo start --web
```

O app abre no navegador em `http://localhost:8081`.

**Para testar no
