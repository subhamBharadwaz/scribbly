# Scribbly

An open source Journal Web App

![Scribbly Landing Page](https://res.cloudinary.com/dogdzaavf/image/upload/v1689845679/Screenshot_2023-07-20_150023_noco29.png)

> **Warning**
> This app is a work in progress.

## Features## About this project

Scribbly is a web application that provides a platform for users to create and manage their digital journal. With Scribbly, users can easily jot down their thoughts, experiences, and ideas, and organize them in a personal and customizable journal.

- **Digital Journaling**: Users can create and store their journal entries online, eliminating the need for physical notebooks or papers.
- **User-Friendly Interface**: Scribbly offers a clean and intuitive user interface, powered by Radix UI and Shadcn/UI components, making it easy for users to navigate and interact with their journal.
- **Secure and Private**: Scribbly prioritizes user data security and privacy, ensuring that journal entries are kept confidential and protected.
- **Subscription Plan**: Scribbly offers a monthly subscription plan that provides users with additional features and benefits.
- **Reminder Feature**: The reminder feature is a valuable addition to Scribbly. By sending reminder emails to users who have activated this option every day at 9 pm, you help users stay consistent with their journaling habit and make it a part of their daily routine.

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
- Creating and sending emails with **React Email** and **Resend**
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
