# 🚗 GoldWash - Sistema de Agendamento para Lava Jato

## 📖 Sobre o Projeto

O **GoldWash** é uma aplicação web desenvolvida para gerenciamento e agendamento de serviços automotivos. O sistema permite que clientes realizem cadastro, login, visualizem os serviços disponíveis e efetuem agendamentos de forma prática e intuitiva.

O projeto foi desenvolvido utilizando tecnologias modernas de Front-End, simulando um ambiente real de atendimento para um lava jato premium.

---

## 🎯 Objetivo

Desenvolver uma aplicação web responsiva capaz de:

* Gerenciar usuários cadastrados;
* Realizar autenticação de clientes;
* Exibir serviços automotivos;
* Permitir agendamento de serviços;
* Simular uma API utilizando JSON Server;
* Aplicar conceitos de React, Context API e React Router.

---

## 👥 Equipe

| Nome                           | Matrícula  |
| ------------------------------ | ---------- |
| Ana Beatriz Pereira da Silva   | 2324290055 |
| Carolaine Nunes Santos         | 2514290034 |
| Paola Stephanie Espejo Barbuio | 2414290088 |

---

## 🛠️ Tecnologias Utilizadas

### Front-End

* React
* Vite
* React Router
* React Hook Form
* Context API
* Tailwind CSS
* Lucide React

### Back-End Simulado

* JSON Server

### Ferramentas

* Git
* GitHub
* Docker
* Docker Compose

---

## 📂 Estrutura do Projeto

```text
Trabalho_Lava_Jato
│
├── src
│   ├── assets
│   ├── components
│   │   ├── Footer
│   │   ├── Layout
│   │   └── Navbar
│   │
│   ├── contexts
│   │   ├── AuthContext.jsx
│   │   └── AgendamentoContext.jsx
│   │
│   ├── pages
│   │   ├── Home
│   │   ├── Login
│   │   ├── Register
│   │   ├── Schedule
│   │   └── Services
│   │
│   ├── services
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── servicoService.js
│   │   └── agendamentoService.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── db.json
├── docker-compose.yml
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── .gitignore
└── README.md
```

---

## ✨ Funcionalidades

### Usuário

* Cadastro de clientes
* Login
* Logout
* Persistência de sessão
* Navegação protegida

### Serviços

* Visualização dos serviços disponíveis
* Exibição de preços por categoria de veículo
* Informações detalhadas dos serviços

### Agendamentos

* Criação de agendamento
* Consulta de agendamentos
* Histórico de serviços

### Interface

* Layout responsivo
* Compatível com desktop e dispositivos móveis
* Navegação intuitiva
* Identidade visual personalizada

---

## 🚘 Serviços Disponíveis

* Lavagem Geral
* Proteção de Pintura
* Limpeza de Motor
* Higienização de Bancos e Tecidos
* Oxizatinização
* Vitrificação
* Descontaminação

---

## 🔒 Autenticação

O sistema utiliza Context API para gerenciamento da autenticação.

Recursos implementados:

* Login de usuários
* Logout
* Controle de acesso
* Persistência em armazenamento local
* Proteção de rotas

---

## 📱 Responsividade

A aplicação foi desenvolvida utilizando Tailwind CSS com foco em responsividade.

Suporte para:

* Smartphones
* Tablets
* Notebooks
* Monitores Desktop

---

## 🗄️ Banco de Dados

O projeto utiliza o arquivo:

```bash
db.json
```

para simular uma API REST através do JSON Server.

Principais coleções:

* usuários
* serviços
* agendamentos

---

## ⚙️ Instalação

### Clonar o repositório

```bash
git clone https://github.com/Paola-Steh/Trabalho_Lava_Jato.git
```

### Entrar na pasta do projeto

```bash
cd Trabalho_Lava_Jato
```

### Instalar dependências

```bash
npm install
```

---

## ▶️ Executando o Projeto

### Iniciar Front-End

```bash
npm run dev
```

### Iniciar API Fake

```bash
npm run api
```

### Executar tudo simultaneamente

```bash
npm run start
```

---

## 🐳 Executando com Docker

### Subir container

```bash
docker compose up -d
```

### Acessar container

```bash
docker exec -it goldwash-app sh
```

### Instalar dependências

```bash
npm install
```

### Executar aplicação

```bash
npm run start
```

---

## 🌐 Portas Utilizadas

### Front-End

```text
http://localhost:5173
```

ou

```text
http://localhost:5174
```

### JSON Server

```text
http://localhost:3000
```

---

## 📦 Scripts Disponíveis

### Executar Vite

```bash
npm run dev
```

### Executar JSON Server

```bash
npm run api
```

### Executar Projeto Completo

```bash
npm run start
```

---

## 📚 Conceitos Aplicados

* Componentização
* React Hooks
* Context API
* Consumo de API
* Rotas protegidas
* Gerenciamento de estado
* Responsividade
* Dockerização
* Organização de código
* Navegação SPA (Single Page Application)

---

## 🚀 Melhorias Futuras

* Painel administrativo
* Upload de imagens dos serviços
* Notificações por e-mail
* Integração com banco de dados real
* Dashboard de relatórios
* Pagamento online

---

## 📄 Licença

Projeto desenvolvido exclusivamente para fins acadêmicos na disciplina de Front-End.
