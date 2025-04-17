# Disruptail Feedback App

Welcome to the Disruptail Feedback App — a full-stack web application built to collect and manage product feedback for a retail context. It enables authenticated users to leave ratings and feedback on products and allows admins to moderate and manage feedback across the platform.

---

## 📚 Table of Contents
- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Project Setup (Hybrid: Docker + Local Prisma)](#️-project-setup-hybrid-docker--local-prisma)
  - [Seeded Demo Data](#-seeded-demo-data)
- [Improvements](#-improvements--ideas)

## 🧠 Project Overview

This application was designed to meet the requirements of a full-stack technical challenge. The core features include:

- User authentication and registration
- Product browsing and filtering by category
- Detailed product pages with ratings and feedback
- Feedback submission, editing, and deletion (with role-based access)
- Feedback manager for admin users and feedback view for regular users

### 🛠 Tech Stack

| Layer              | Technology       | Justification                                                                 |
|-------------------|------------------|-------------------------------------------------------------------------------|
| Frontend          | Next.js 15 (App Router) | For full-stack capabilities, SSR, API routes, and seamless routing             |
| Styling           | Tailwind CSS     | Utility-first styling for rapid and responsive UI development                |
| Component System  | shadcn/ui        | Headless UI components integrated with Tailwind CSS for accessibility & theme |
| Authentication    | next-auth        | Secure and extensible authentication with support for role-based access       |
| ORM & DB          | Prisma + PostgreSQL | Type-safe, flexible ORM with schema migrations and seed management           |
| API               | REST (via Next.js) | Simple and scalable backend API routes                                         |
| Containerization  | Docker + docker-compose | For local development and deployment parity                                   |

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js v18+
- Docker & Docker Compose (for container-based setup)
- PostgreSQL (if running outside Docker)

---

### ⚙️ Project Setup (Hybrid: Docker + Local Prisma)

```bash
# 1. Clone the repository
git clone https://github.com/FrigoDev/disruptail-feedback-app
cd disruptail-feedback-app

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env

# 4. Run the app container (Next.js + PostgreSQL)
docker-compose up -d

# 5. Apply DB schema
npx prisma migrate dev --name init

# 6. Seed initial users and products
npx tsx prisma/seed.ts
npx tsx prisma/seed-products.ts

# 7. Start the development server
npm run dev

```
---

### 🧪 Seeded Demo Data

After running the seed commands, the app is populated with demo users and products:

#### 👤 Users (You can register more)
| Email           | Password | Role  |
|----------------|----------|-------|
| admin@test.com | 123456   | ADMIN |
| user@test.com  | 123456   | USER  |

#### 🛍️ Products
6 diverse products have been seeded, each with an image, description, and assigned category:
- T-Shirt Premium (Clothing)
- Running Sneakers (Footwear)
- Winter Jacket (Clothing)
- Bluetooth Headphones (Electronics)
- Water Bottle (Accessories)
- Desk Lamp (Home & Office)

Each product includes a high-quality embedded base64 image, mock description, and belongs to a clearly distinguishable category for filtering and testing feedback functionality.

---

## 🧩 Improvements & Ideas

- Add unit and integration tests using Jest and React Testing Library
- Protect API routes using middleware (e.g. rate limiting, enhanced session validation)
- Admin dashboard UI with statistics and feedback analytics using sentiment analysis
- Pagination for large product or feedback lists
- Internationalization (i18n) for multi-language support

---

## 🧱 Architecture Notes & Modularity Vision

This project was intentionally designed to be **modular**, **scalable**, and easy to maintain. From the beginning, the goal was not just to solve the technical challenge, but to build a clean, production-ready.

### 🧩 Design Principles

- **Separation of concerns**: Logic is split across routes, UI components, and utility functions to ensure clarity and testability.
- **Reusability**: UI elements and feedback features are abstracted into isolated components.
- **Role-based access**: Admin and user views share code but render conditionally based on authenticated session roles.
- **Progressive enhancement**: Features like feedback filtering, inline editing, and image base64 embedding are layered progressively.

---

## 🙏 Acknowledgements

Thanks for taking the time to review this project. It was developed with attention to clean architecture, good UX, and thoughtful code structure.  
If you have any questions or suggestions, feel free to reach out!

— FrigoDev