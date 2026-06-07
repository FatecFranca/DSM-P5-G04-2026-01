# Mobile — React Native (Expo)

Aplicativo mobile para triagem informativa de características associadas ao Transtorno do Espectro Autista (TEA), integrado às APIs de classificação (FastAPI) e autenticação (Express + Prisma).

| Serviço | Stack               | Porta           |
| ------- | ------------------- | --------------- |
| Mobile  | React Native + Expo | Expo Dev Server |

## Estrutura

```text
mobile/
├── assets/
├── src/
│   ├── components/
│   │   ├── BottomNavCustom.js
│   │   ├── HeaderCustom.js
│   │   ├── Questionario.js
│   │   └── Resultado.js
│   ├── constants/
│   │   └── questoes.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Cadastro.js
│   │   ├── Home.js
│   │   ├── Perfil.js
│   │   ├── Questionario.js
│   │   ├── Resultado.js
│   │   └── Clinicas.js
│   ├── services/
│   │   ├── api.js
│   │   ├── authApi.js
│   │   ├── predictionApi.js
│   │   └── clinics.js
│   ├── utils/
│   │   ├── accountSession.js
│   │   └── phoneMasks.js
│   ├── routes.js
│   └── styles.js
├── App.js
├── app.json
├── package.json
└── index.js
```

## Requisitos

* Node.js 18+
* npm
* Expo CLI

Instalação do Expo CLI (caso necessário):

```bash
npm install -g expo-cli
```

## Instalação

Na pasta `mobile`:

```bash
npm install
```

## Dependências utilizadas

```bash
npm install axios

npm install @react-native-async-storage/async-storage

npm install @react-navigation/native

npm install @react-navigation/native-stack

npm install @react-native-picker/picker

npx expo install react-native-screens

npx expo install react-native-safe-area-context

npx expo install react-native-gesture-handler

npx expo install react-native-reanimated

npx expo install expo-location
```

## Configuração das APIs

O aplicativo utiliza duas APIs:

| API              | Arquivo                         |
| ---------------- | ------------------------------- |
| Usuários / Login | `src/services/authApi.js`       |
| Predição ML      | `src/services/predictionApi.js` |


### Importante

Ao executar o aplicativo em celular físico ou emulador Android, utilize seu ip local na mobile/src/services/api.js:

Exemplo:

```text
http://SEU_IP:8000
http://SEU_IP:8001
```

Para descobrir o IP da máquina:

```bash
ipconfig
```

Procure pelo endereço IPv4.

## Executar

Com os backends já iniciados:

### Iniciar o Expo

```bash
npx expo start
```

ou

```bash
npm start
```

O Expo abrirá um QR Code.

### Android

```bash
a
```

### Web

```bash
w
```

### Escanear QR Code

Abra o aplicativo Expo Go no celular e escaneie o QR Code exibido pelo terminal.

## Fluxo do Aplicativo

### Cadastro

Tela:

```text
Cadastro
```

Endpoint:

```http
POST /users
```

### Login

Tela:

```text
Login
```

Endpoint:

```http
POST /auth/login
```

### Questionário AQ-10

Tela:

```text
Questionario
```

Endpoint:

```http
POST /predict
```

Dados enviados:

```json
{
  "A1_Score": 1,
  "A2_Score": 0,
  "A3_Score": 1,
  "A4_Score": 0,
  "A5_Score": 1,
  "A6_Score": 0,
  "A7_Score": 1,
  "A8_Score": 0,
  "A9_Score": 1,
  "A10_Score": 0,
  "age": 25,
  "gender": "m",
  "ethnicity": "Latino",
  "jundice": "no",
  "austim": "no",
  "contry_of_res": "Brazil",
  "used_app_before": "no",
  "age_desc": "18 and more",
  "relation": "Self"
}
```

### Resultado

Tela:

```text
Resultado
```

Exibe:

* Probabilidade de traços associados ao TEA
* Mensagem retornada pela API
* Opção para refazer o questionário
* Busca de clínicas próximas

### Clínicas Próximas

Tela:

```text
Clinicas
```

Utiliza:

```text
expo-location
OpenStreetMap
Google Maps
```

Permite:

* Obter localização do usuário
* Encontrar profissionais próximos
* Abrir rota no Google Maps

## Estrutura de Navegação

```text
Login
 ├── Cadastro
 └── Home
      ├── Questionario
      │     └── Resultado
      ├── Clinicas
      └── Perfil
```

## Solução de Problemas

### Erro de conexão

Verifique:

```text
- Backend FastAPI ativo na porta 8000
- Backend Express ativo na porta 8001
- IP configurado corretamente
- Firewall liberado
```

### Erro de localização

Verifique se a permissão foi concedida ao aplicativo.

### Erro de login

Confirme:

```text
- Usuário cadastrado
- Banco MySQL ativo
- API Express funcionando
```

## Projeto Integrador — DSM 5º Semestre

Aplicativo mobile desenvolvido para integração com o sistema de triagem de TEA utilizando Machine Learning, FastAPI, Express, Prisma e React Native.
