# 📱 LoginApp - Autenticação com Supabase e React Native

Este é um projeto de autenticação simples utilizando **React Native com Expo**, integração com **Supabase** e banco de dados **PostgreSQL**. O app permite o **cadastro**, **login** e acesso a uma **tela Home**, com opção de **logout**.

---

## 🔧 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/)
- PostgreSQL (via Supabase)
- React Navigation

---

## 📸 Screenshots

| Tela de Login | Tela de Cadastro | Tela Home |
|---------------|------------------|-----------|
|![a6ba41d5-8bb1-4534-8da7-3247cb092e0d](https://github.com/user-attachments/assets/bbdc992e-7b9d-4d20-bcc3-11d493cb3ee1) | ![b2933845-665a-4104-a6cf-10f3560679a1](https://github.com/user-attachments/assets/ead9ede3-9e2c-421b-975f-00572752f34b) | ![c84c6b28-183b-420c-a2f6-9430eab6aaa6](https://github.com/user-attachments/assets/8230b1a9-9775-4c09-bafe-6284af4fe0e2)


---

## 🚀 Instalação e Execução

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/LoginApp.git
cd LoginApp
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn
```

3. **Configure o Supabase:**

- Crie um projeto no [Supabase](https://supabase.com/)
- Crie uma tabela chamada `users` com as colunas:
  - `id`: UUID, Primary Key
  - `email`: text
  - `password`: text

- Crie uma política pública (temporária para testes):

```sql
create policy "Allow all operations"
on "public"."users"
as PERMISSIVE
for ALL
to public
using (true)
with check (true);
```

4. **Configure a chave Supabase no projeto:**

Crie o arquivo `lib/supabase.ts` com o seguinte conteúdo:

```ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co';
const SUPABASE_ANON_KEY = 'SUA_CHAVE_PUBLICA';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

5. **Execute o projeto:**

```bash
npx expo start
```

Escaneie o QR Code com o app **Expo Go**.

---

## 📁 Estrutura de Pastas

```
LoginApp/
├── App.tsx
├── screens/
│   ├── LoginScreen.tsx
│   ├── CadastroScreen.tsx
│   └── HomeScreen.tsx
├── lib/
│   └── supabase.ts
└── README.md
```

---

## ✅ Funcionalidades

- [x] Cadastro de novo usuário
- [x] Login com verificação de email e senha
- [x] Redirecionamento para tela Home com boas-vindas
- [x] Logout funcional
- [x] Integração com Supabase + PostgreSQL

---

## 🔐 Aviso de Segurança

**Não armazene senhas em texto puro em produção!**  
Esse projeto é apenas para fins educativos. Em um sistema real, utilize o sistema de autenticação nativo do Supabase (`auth.signUp`, `auth.signIn`) que já faz o hash seguro da senha.
