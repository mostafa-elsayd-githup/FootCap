<div align="center">

# 👟 FootCap — Sports E-Commerce Store

A full-stack e-commerce platform for sports shoes and apparel, built with the modern React ecosystem.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-mo--store--7000.vercel.app-black?style=for-the-badge&logo=vercel)](https://mo-store-7000.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

[Live Demo](https://mo-store-7000.vercel.app) · [Report Bug](https://github.com/mostafa-elsayd-githup/FootCap/issues) · [Request Feature](https://github.com/mostafa-elsayd-githup/FootCap/issues)

</div>

---

## 📖 About The Project

**FootCap** is a full-stack e-commerce store for sports shoes and apparel from brands like **Adidas** and **Nike**. It was built to practice and demonstrate real-world frontend engineering: full **CRUD** operations, authenticated user flows, server-side data handling, and a production deployment pipeline.

The project started as a static site with **HTML, CSS, JavaScript, and Bootstrap**, and was later rebuilt from the ground up using **Next.js, React, TypeScript, and Tailwind CSS**, with **Supabase** powering the backend and authentication.

> 🚧 **Status:** Actively maintained — currently working through post-deployment bug fixes and performance improvements on Vercel.

---

## ✨ Features

- 🛍️ **Product Catalog** — Browse by category: Men, Women, Kids, and by sport (Running, Football, Gym, Tennis, Basketball)
- 🔍 **Full CRUD** — Create, read, update, and delete products and cart items
- 🔐 **Authentication** — Secure sign up, login, and logout powered by Supabase Auth
- 🛒 **Shopping Cart** — Add, update, and remove items with persistent cart state
- ❤️ **Wishlist** — Save favorite products for later
- 👤 **User Profile** — Dedicated profile page for account management
- ✅ **Form Validation** — Type-safe form validation using **Zod**
- 📱 **Fully Responsive** — Mobile-first design built with Tailwind CSS
- ⚡ **State Management** — Centralized app state using **Redux Toolkit (RTK)**
- ☁️ **Live Deployment** — Deployed and hosted on **Vercel**

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Next.js (App Router & Server Actions) |
| **Library** | React.js |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **State Management** | Redux Toolkit |
| **Backend / DB** | Supabase |
| **Authentication** | Supabase Auth |
| **Validation** | Zod |
| **Deployment** | Vercel |

**Earlier version built with:** HTML, CSS, JavaScript, Bootstrap

---

## 📂 Project Structure

```
FootCap/
├── API/            # API route handlers
├── Components/     # Reusable UI components
├── RTK/            # Redux Toolkit store, slices & state logic
├── app/            # Next.js App Router pages & layouts
├── public/         # Static assets (images, icons)
├── schemas/        # Zod validation schemas
├── server/         # Server-side logic & actions
└── utils/          # Helper functions & utilities
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm
- A [Supabase](https://supabase.com/) project (URL + Anon Key)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mostafa-elsayd-githup/FootCap.git
   cd FootCap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 🗺️ Roadmap

- [ ] Fix known bugs found in the production deployment
- [ ] Improve performance & loading states
- [ ] Add payment gateway integration
- [ ] Add order history & tracking
- [ ] Add product reviews & ratings
- [ ] Write unit & integration tests

See [open issues](https://github.com/mostafa-elsayd-githup/FootCap/issues) for the full list of proposed features and known bugs.

---

## 🌐 Live Demo

👉 **[mo-store-7000.vercel.app](https://mo-store-7000.vercel.app)**

---

## 👤 Contact

**Mostafa Elsayd**
Frontend Developer | React.js · Next.js · TypeScript

- LinkedIn: [linkedin.com/in/mostafa-elsayd-div](https://www.linkedin.com/in/mostafa-elsayd-div)
- GitHub: [@mostafa-elsayd-githup](https://github.com/mostafa-elsayd-githup)

---

<div align="center">

If you found this project interesting, consider giving it a ⭐!

</div>
