# Frontend — Site + questionário + conta

Interface web em **React + Vite**: landing page, questionário AQ-10, resultado com busca de clínicas, cadastro, login e logout.

## Pré-requisitos

As duas APIs do backend devem estar rodando:

| API | Porta | Necessária para |
|-----|-------|-----------------|
| FastAPI (ML) | 8000 | Questionário e classificação |
| Express (usuários) | 8001 | Criar conta e entrar |

## Instalação

```bash
cd frontend
npm install
copy .env.example .env
```

## Variáveis de ambiente

```env
# Local
VITE_API_URL=http://localhost:8000
VITE_USERS_API_URL=http://localhost:8001

# Produção / Azure
VITE_API_URL=http://20.110.145.100/ml
VITE_USERS_API_URL=http://20.110.145.100/users
```

## Executar

```bash
npm run dev
```

Acesse localmente por http://localhost:5173
Acesse online por http://20.110.145.100

## Fluxos na interface

| Ação | O que acontece |
|------|----------------|
| **Questionário** | Envia respostas para `POST /predict` |
| **Criar conta** | E-mail, telefone e senha → `POST /users` |
| **Entrar** | E-mail e senha → `POST /auth/login` |
| **Sair** | Remove usuário do `localStorage` |
| **Usar minha localização** | Busca clínicas via OpenStreetMap (sem backend) |

A sessão é guardada em `localStorage` (`pi5_user`). O questionário funciona sem estar logado.

## Build para produção

```bash
npm run build
npm run preview
```
