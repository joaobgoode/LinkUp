
# Desafio Técnico: Sistema de Indicação (Referral System)

Este repositório contém a solução para o desafio técnico do processo seletivo do **Vortex**, que consiste na criação de uma **Single Page Application (SPA)** com um sistema de cadastro de usuários e pontuação por indicação (**Referral System**).

---

## Estrutura do Projeto

A aplicação é organizada em dois diretórios principais: **backend/** e **frontend/**.

### Frontend (`/frontend`)
Estrutura de pastas e arquivos principais:

```
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── CloudBackground.vue      # Componente decorativo de fundo
│   │   ├── PageFooter.vue           # Rodapé
│   │   └── PageHeader.vue           # Cabeçalho
│   ├── router/
│   │   └── index.js                  # Configuração das rotas do Vue Router
│   ├── services/
│   │   ├── auth.js                   # Comunicação com API para autenticação
│   │   ├── token.js                  # Manipulação do token de sessão
│   │   └── user.js                    # Requisições de dados do usuário
│   ├── stores/
│   │   └── referral.js                # Gerenciamento do estado do token de indicação (Pinia)
│   ├── utils/
│   │   └── validadors.js              # Funções de validação de inputs
│   ├── views/
│   │   ├── HomeView.vue               # Tela de Login/Registro
│   │   └── PerfilView.vue             # Tela de Perfil do usuário
│   ├── App.vue                         # Componente raiz
│   └── main.js                         # Ponto de entrada da aplicação Vue
├── package.json
├── index.html
└── vite.config.js
```

---

### Backend (`/backend`)
Estrutura de pastas e arquivos principais:

```
backend/
├── src/
│   ├── auth/
│   │   ├── authentication.js       # Lógica de autenticação
│   │   ├── cookieUtils.js          # Utilidades para manipulação de cookies
│   │   └── jwt.js                   # Funções de geração e validação de JWT
│   ├── controllers/
│   │   └── user.controller.js      # Controladores de usuário (login, registro, perfil)
│   ├── entities/
│   │   └── User.js                  # Entidade User do TypeORM
│   ├── middleware/
│   │   └── jwt.middleware.js        # Middleware para proteção de rotas
│   ├── routes/
│   │   ├── auth.routes.js           # Rotas de autenticação
│   │   └── user.routes.js           # Rotas de usuário
│   ├── schemas/
│   │   └── user.schema.js           # Validação de dados de entrada (Zod)
│   ├── services/
│   │   └── user.service.js          # Lógica de negócio para usuários
│   ├── utils/
│   │   └── errorHandler.js          # Tratamento centralizado de erros
│   ├── app.js                        # Configuração principal do Express
│   ├── data-source.js                # Configuração do TypeORM
│   └── server.js                     # Inicialização do servidor
├── package.json
└── eslint.config.js
```

> Essa organização favorece a **separação de responsabilidades**, facilitando manutenção, escalabilidade e testes.

---

## Funcionalidades Implementadas

### 1. Área de Autenticação (`/`)
- **Formulário Unificado:** Alterna entre Login e Registro.
- **Validação de Campos (Front-end):**
  - Verifica campos obrigatórios.
  - Valida formato de e-mail.
  - Garante senha com mínimo de 8 caracteres, letras e números.
  - Verifica confirmação de senha.
- **Redirecionamento Protegido:** Usuário autenticado que tenta acessar `/` é redirecionado para `/perfil`.

### 2. Área de Perfil (`/perfil`)
- **Autenticação Obrigatória:** Acesso restrito a usuários logados.
- **Exibição de Dados:** Nome do usuário e pontuação.
- **Link Único de Indicação:** Exibe link gerado pelo sistema.
- **Cópia Rápida:** Botão **“Copiar”** que salva o link na área de transferência.
- **Lógica de Pontuação:** Ao cadastrar-se usando um link de indicação, o dono do link ganha **1 ponto**.

---

## Stack Tecnológico e Justificativa

### Front-end

| Tecnologia        | Versão      | Justificativa |
|-------------------|-------------|---------------|
| **Vue.js**        | 3 (Composition API) | Curva de aprendizado suave, excelente desempenho e organização com script, template e styles no mesmo arquivo.| 
| **Vite**          | Latest      | Bundler rápido com HMR eficiente. |
| **Pinia**         | Latest      | Gerenciamento de estado leve e intuitivo. |
| **CSS Puro & Responsividade** | N/A | Uso de Flexbox e Media Queries, em conformidade com o desafio. |

---

### Back-end

| Tecnologia        | Versão      | Justificativa |
|-------------------|-------------|---------------|
| **Node.js**       | Latest      | Plataforma robusta para APIs REST. |
| **Express**       | Latest      | Framework minimalista e rápido para endpoints. |
| **TypeORM**       | Latest      | ORM que simplifica a persistência no PostgreSQL. |
| **PostgreSQL**    | Latest      | Banco SQL robusto, ACID-compliant e confiável. De facil migração entre provedores |
| Zod              | Latest      | Validação de dados de entrada. |

---

## Possibilidades de Expansão

- **Conexão Visual de Indicações:** Graças ao `referrerId`, é possível construir uma **árvore de indicações** ou **dashboard de rede**.
- **Dashboard Temporal:** Usar o campo `createdAt` para relatórios de indicações ao longo do tempo, permitindo **métricas de crescimento**.

---

## Instruções de Execução Local

### Pré-requisitos
- **Node.js** (LTS)
- **npm** ou **yarn**
- Instância do **PostgreSQL**

---

### 1. Configuração do Banco de Dados
Crie um arquivo `.env` na raiz do backend:

```env
# Exemplo de .env
DATABASE_URL=postgres://postgres@localhost:5432/vortex
JWT_SECRET=SEGREDO_SUPER_SECRETO
JWT_REFRESH_SECRET=SEGREDO_SUPER_SECRETO_2

# Caso não rode local:
FRONTEND_URL=https://example.com

```

> O **TypeORM** cria automaticamente a tabela `User` com as colunas necessárias.

Crie um arquivo `.env` na raiz do frontend:

```env
# Caso não rode local:
BACKEND_URL=http://example.com/api

```

---

### 2. Backend
```bash
cd backend
npm install
npm run start
# Servidor em http://localhost:3000
```

---

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
# Aplicação em http://localhost:5173
```

---

## Colaboração com IA

| Ferramenta de IA  | Finalidade |
|-------------------|------------|
| **Supermaven**    | Autocomplete de código para boilerplates e serviços, acelerando a codificação. |
| **Gemini (LLM)**  | Debug de Promises, suporte a sintaxe (e.g., `useRouter` vs `useRoute`), refatoração de configs (e.g., `eslint.config.js`). Ajuda pontuais, como com Regexes, duvidas com css e funcionamento das Frameworks |

---

## Aprendizado
Delegar tarefas repetitivas à IA (como boilerplate) possibilitou focar nas **decisões críticas de arquitetura** e na **lógica de negócio**.
Entender como funcionam os frameworks e linguagens de programação permite entender melhor o funcionamento do sistema e a sua arquitetura.
Entender o problema como um todo, facilitou nas decisões de arquitetura e lógica de negócio.
