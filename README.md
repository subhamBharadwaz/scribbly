# Scribbly

An open source Journal Web App

> **Warning**
> This app is a work in progress.

## About this project

Scribbly is a web application that provides a platform for users to create and manage their digital journal. With Scribbly, users can easily jot down their thoughts, experiences, and ideas, and organize them in a personal and customizable journal.

- **Digital Journaling**: Users can create and store their journal entries online, eliminating the need for physical notebooks or papers.
- **User-Friendly Interface**: Scribbly offers a clean and intuitive user interface, powered by Radix UI and Shadcn/UI components, making it easy for users to navigate and interact with their journal.
- **Secure and Private**: Scribbly prioritizes user data security and privacy, ensuring that journal entries are kept confidential and protected.
- **Subscription Plan**: Scribbly offers a monthly subscription plan that provides users with additional features and benefits.

## Features

- Next.js `/app` dir,
- Routing, Layouts, Nested Layouts and Layout Groups
- Data Fetching, Caching and Mutation using **TanStack Query**
- Route handlers
- Metadata files
- Server and Client Components
- API Routes and Middleware
- Authentication using **Clerk**
- Block-Style editor with **Editor.js**
- ORM using **Prisma**
- Database on **PlanetScale**
- UI Components built using **Radix UI** and **shadcn/ui**
- Subscriptions using **Stripe**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**

## Running Locally

1. Install dependencies using pnpm:

```sh
pnpm install
```

2. Copy `.env.example` to `.env.local` and update the variables.

```sh
cp .env.example .env.local
```

3. Start the development server:

```sh
pnpm dev
```

## License

Licensed under the [MIT license](https://github.com/subhamBharadwaz/scribbly/blob/main/LICENSE.md).
