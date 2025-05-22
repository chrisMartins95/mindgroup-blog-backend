# 🚀 Blog Backend

Backend do sistema de blog desenvolvido com **Node.js**, **Express** e **TypeScript**, utilizando **MySQL** como banco de dados.

---

## 🎯 Funcionalidades

- 🔐 Cadastro e login de usuários com criptografia de senha usando **bcrypt**  
- 📝 CRUD completo para artigos (criar, ler, editar, deletar)  
- 📸 Upload e armazenamento de imagens destacadas no banco (formato BLOB)  
- 🔒 Rotas protegidas com autenticação JWT (JSON Web Token)  
- ⚙️ Validação e tratamento de erros

---

## 🛠️ Tecnologias

- Node.js + Express  
- TypeScript  
- MySQL  
- bcrypt para hash de senhas  
- jsonwebtoken para autenticação  
- multer para upload de arquivos  
- ts-node-dev para desenvolvimento rápido

---

## ⚙️ Como rodar o projeto

1. Clone este repositório

```bash
git clone https://github.com/seuusuario/seurepositorio-backend.git

2.Instale as dependências

bash

npm install
# ou

yarn install

3.Configure as variáveis de ambiente
  Crie um arquivo .env na raiz com as seguintes variáveis:

env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta
PORT=3000

4.Importe o dump do banco de dados
Execute o arquivo dump.sql presente no repositório para criar as tabelas e dados iniciais.

5.Inicie o servidor

bash

npm run dev

# ou

yarn dev

6.O backend estará rodando em http://localhost:3000

📁 Estrutura do projeto

bash
src/
├── controllers/     # Lógica das rotas
├── middlewares/     # Middlewares de autenticação, erro, etc
├── models/          # Modelos e interfaces TypeScript
├── routes/          # Definição das rotas da API
├── services/        # Lógica de negócios e acesso ao banco
└── utils/           # Utilitários e helpers

🤝 Contribuições

Pull requests são bem-vindos!
Abra issues para sugerir melhorias ou reportar bugs.

📝 Licença
Projeto licenciado sob MIT License.

📞 Contato
Seu Christian Martins - chriswork995@gmail.com
LinkedIn: https://www.linkedin.com/in/christian-martins-40a469254/
GitHub: chrisMartins95

🙏 Agradecimentos

Obrigado pela oportunidade de apresentar este projeto!
Estou à disposição para qualquer dúvida.