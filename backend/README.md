# Backend — ML (FastAPI) + Usuários (Express + Prisma)

Duas APIs no mesmo repositório, compartilhando o arquivo `.env` na raiz de `backend/`.

| Serviço | Stack | Porta | Comando |
|---------|-------|-------|---------|
| Classificação ML | FastAPI, scikit-learn | 8000 | `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000` |
| Usuários / auth | Express, Prisma, MySQL | 8001 | `npm run dev` |

## Estrutura

```
backend/
├── app/                      # FastAPI + ML
│   ├── api/routes.py         # /health, /predict
│   ├── models/schemas.py
│   ├── services/prediction_service.py
│   ├── ml/
│   └── main.py
├── prisma/
│   ├── schema.prisma         # User (email, phone, passwordHash)
│   └── migrations/
├── src/                      # Express
│   ├── index.ts
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── password.ts       # bcrypt
│   │   └── userFormat.ts
│   └── routes/
│       ├── users.ts          # CRUD
│       └── auth.ts           # POST /auth/login
├── data/autism_screening-1.csv
├── artifacts/
├── requirements.txt          # Python
├── package.json              # Node
└── .env.example
```

## Variáveis de ambiente (`.env`)

Copie o exemplo e ajuste:

```bash
copy .env.example .env
```

| Variável | Uso |
|----------|-----|
| `DATABASE_URL` | Conexão MySQL para Prisma (`mysql://user:pass@localhost:3306/pi5`) |
| `USERS_API_PORT` | Porta da API Express (padrão `8001`) |
| `CORS_ORIGINS` | Origens permitidas (inclua `http://localhost:5173`) |
| `MODEL_PATH`, `CSV_PATH` | Caminhos do dataset e do modelo treinado |
| `APP_NAME`, `APP_VERSION` | Metadados do `/health` da FastAPI |

## Instalação

### Python (API de ML)

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
python -m app.ml.train
```

### Node (API de usuários)

```bash
npm install
npm run db:migrate
```

O banco MySQL `pi5` deve existir antes da migration:

```sql
CREATE DATABASE pi5 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Executar

Dois terminais na pasta `backend/`:

```bash
# Terminal 1
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

```bash
# Terminal 2
npm run dev
```

## API de ML (porta 8000)

- `GET /health` — status e se o modelo está carregado
- `POST /predict` — classificação a partir do questionário
- Docs: http://localhost:8000/docs

## API de usuários (porta 8001)

- `GET /health` — status do serviço
- `POST /users` — cadastro (`email`, `phone`, `password`; senha mín. 6 caracteres)
- `POST /auth/login` — login (`email`, `password`); retorna dados do usuário (sem hash)
- `GET /users`, `GET /users/:id`, `PUT /users/:id`, `DELETE /users/:id` — CRUD

A senha é armazenada como hash (`bcrypt`). Respostas de usuário **nunca** incluem `password_hash`.

## Scripts npm

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Sobe a API Express com hot reload |
| `npm run db:migrate` | Aplica migrations Prisma |
| `npm run db:generate` | Regenera o client Prisma |
| `npm run db:studio` | Interface visual do banco |

## CORS

No `.env`, inclua a origem do frontend:

```env
CORS_ORIGINS=http://localhost:5173,*
```
