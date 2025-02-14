# Tudo List
Criando projeto fullstack um tudo list, plataforma de gerenciar tarefas online
![Captura de Tela (774)](https://github.com/user-attachments/assets/2745e087-f4c6-43ee-9c9b-67a10942d766)
## Introdução 
Frontend desenvolvido com Next.js, TypeScript e Tailwind CSS, utilizando o DeepSeek para criar um design minimalista e responsivo. A plataforma oferece uma interação intuitiva para o usuário. Foram criados componentes reutilizáveis com Axios para facilitar a comunicação com o servidor/backend desenvolvido em Java Spring Boot.

Backend: Desenvolvi uma API REST com Java e Spring Boot para atender às necessidades do frontend e criar uma plataforma funcional e dinâmica. Focando principalmente na lógica do servidor, criei classes de entidade para Task e TaskList e repositórios com JPA para gerenciar o banco de dados PostgreSQL. Em Service, criei uma interface que define os métodos principais para o serviço de gerenciamento de listas de tarefas, e em ServiceImpl, implementei as interfaces e os comportamentos desses métodos. No Controller, desenvolvi os métodos e o corpo das requisições para atender aos endpoints da aplicação.
## Ferramentas 
* TypeScript
* Java
* Spring Boot
* Nextjs
* Tailwindcss
* PostgreSQL


This is a [Next.js](https://nextjs.org) project bootstrapped with [`c

reate-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
