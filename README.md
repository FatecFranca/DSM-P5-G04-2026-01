# PI5 — Triagem de Autismo (TEA)

Projeto acadêmico de triagem **informativa** com questionário AQ-10, classificação por ML e busca de clínicas próximas. Não substitui avaliação profissional.

## Estrutura

| Pasta         | Tecnologia               | Função                     | Porta           |
| ------------- | ------------------------ | -------------------------- | --------------- |
| **backend/**  | FastAPI + scikit-learn   | API de classificação (ML)  | 8000            |
| **backend/**  | Express + Prisma + MySQL | Cadastro, login e usuários | 8001            |
| **frontend/** | React + Vite             | Site, questionário, conta  | 5173            |
| **mobile/**   | React Native + Expo      | Aplicativo mobile          | Expo Dev Server |

Documentação detalhada:

* [backend/README.md](backend/README.md)
* [frontend/README.md](frontend/README.md)
* [mobile/README.md](mobile/README.md)

## Pré-requisitos

* **Python** 3.11+ (venv)
* **Node.js** 18+ e npm
* **MySQL** 8+ com banco `pi5` criado
* **Expo CLI** (para execução do aplicativo mobile)

```sql
CREATE DATABASE pi5 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Configuração (uma vez)

### Backend

```bash
cd backend
copy .env.example .env
```

Edite o `.env` e configure pelo menos:

```env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/pi5"
USERS_API_PORT=8001
```

Ambiente Python:

```bash
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m app.ml.train
```

API de usuários (Node + Prisma):

```bash
npm install
npm run db:migrate
```

### Frontend

```bash
cd frontend
copy .env.example .env
npm install
```

O `.env` padrão já aponta para as APIs locais:

```env
VITE_API_URL=http://localhost:8000
VITE_USERS_API_URL=http://localhost:8001
```

### Mobile

```bash
cd mobile
npm install
```

Caso necessário:

```bash
npm install -g expo-cli
```

Configure as URLs das APIs no arquivo:

```text
mobile/app.json
```

Exemplo para ambiente local:

```json
{
  "expo": {
    "extra": {
      "API_USERS_URL": "http://SEU_IP:8001",
      "API_ML_URL": "http://SEU_IP:8000"
    }
  }
}
```

## Como rodar no dia a dia

São **quatro terminais** (frontend + backend) ou **três terminais** caso utilize apenas o mobile.

### Terminal 1 — API de ML (FastAPI, porta 8000)

```bash
cd backend
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2 — API de usuários (Express, porta 8001)

```bash
cd backend
npm run dev
```

### Terminal 3 — Frontend (Vite, porta 5173)

```bash
cd frontend
npm run dev
```

Acesse:

```text
http://localhost:5173
```

### Terminal 4 — Mobile (Expo)

```bash
cd mobile
npx expo start
```

ou

```bash
npm start
```

## O que funciona no frontend e mobile

* **Questionário** → envia respostas para `POST /predict` (porta 8000)
* **Criar conta** → e-mail, telefone e senha → `POST /users` (porta 8001)
* **Entrar** → e-mail e senha → `POST /auth/login` (porta 8001)
* **Sair** → limpa a sessão local
* **Resultado** → busca de clínicas via OpenStreetMap

O questionário **não exige** conta. Cadastro e login servem para identificar a participação no projeto.

## Endpoints úteis

| URL                          | Descrição                 |
| ---------------------------- | ------------------------- |
| http://localhost:8000/health | Status da API de ML       |
| http://localhost:8000/docs   | Swagger da API de ML      |
| http://localhost:8001/health | Status da API de usuários |
| http://localhost:5173        | Frontend                  |

### Ambiente de Produção (Azure)

| URL                                | Descrição       |
| ---------------------------------- | --------------- |
| http://20.110.145.100              | Frontend        |
| http://20.110.145.100/users/health | API de usuários |
| http://20.110.145.100/ml/health    | API de ML       |

## Problemas comuns

| Sintoma                          | Verificar                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------- |
| Questionário não classifica      | Terminal 1 (FastAPI) rodando? Modelo treinado (`python -m app.ml.train`)?       |
| Erro ao criar conta / entrar     | Terminal 2 (`npm run dev`) rodando? `DATABASE_URL` correto? Migration aplicada? |
| Aplicativo mobile não conecta    | IP configurado corretamente no `app.json`? APIs rodando?                        |
| `Este e-mail já está cadastrado` | E-mail já existe no banco                                                       |
| `E-mail ou senha incorretos`     | Credenciais inválidas no login                                                  |
| Erro de localização no mobile    | Permissão de localização concedida ao aplicativo?                               |

## Deploy

O projeto está atualmente hospedado em uma máquina virtual Azure utilizando:

* Nginx
* PM2
* FastAPI
* Express
* MySQL

URLs públicas:

```text
Frontend:
http://20.110.145.100

API Usuários:
http://20.110.145.100/users

API ML:
http://20.110.145.100/ml
```
